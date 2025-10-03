<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function dashboard(Request $request)
    {
        $startDate = $request->get('start_date', now()->startOfMonth());
        $endDate = $request->get('end_date', now()->endOfMonth());

        // Total sales
        $totalSales = Order::whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->sum('total');

        // Total orders
        $totalOrders = Order::whereBetween('created_at', [$startDate, $endDate])->count();

        // Total customers
        $totalCustomers = Customer::count();

        // Average order value
        $avgOrderValue = $totalOrders > 0 ? $totalSales / $totalOrders : 0;

        // Sales by date (for chart)
        $salesByDate = Order::whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top selling products
        $topProducts = Product::select('products.*', DB::raw('SUM(order_items.quantity) as total_sold'))
            ->join('order_items', 'products.id', '=', 'order_items.product_id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->where('orders.payment_status', 'paid')
            ->groupBy('products.id')
            ->orderByDesc('total_sold')
            ->limit(10)
            ->get();

        // Recent orders
        $recentOrders = Order::with(['customer', 'items.product'])
            ->latest()
            ->limit(10)
            ->get();

        return response()->json([
            'summary' => [
                'total_sales' => $totalSales,
                'total_orders' => $totalOrders,
                'total_customers' => $totalCustomers,
                'avg_order_value' => $avgOrderValue,
            ],
            'sales_by_date' => $salesByDate,
            'top_products' => $topProducts,
            'recent_orders' => $recentOrders,
        ]);
    }

    public function salesReport(Request $request)
    {
        $startDate = $request->get('start_date', now()->startOfMonth());
        $endDate = $request->get('end_date', now()->endOfMonth());

        $sales = Order::with(['customer', 'user', 'items.product'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($sales);
    }

    public function productReport(Request $request)
    {
        $startDate = $request->get('start_date', now()->startOfMonth());
        $endDate = $request->get('end_date', now()->endOfMonth());

        $products = Product::select(
            'products.*',
            DB::raw('COALESCE(SUM(order_items.quantity), 0) as total_sold'),
            DB::raw('COALESCE(SUM(order_items.subtotal), 0) as total_revenue')
        )
            ->leftJoin('order_items', 'products.id', '=', 'order_items.product_id')
            ->leftJoin('orders', function ($join) use ($startDate, $endDate) {
                $join->on('order_items.order_id', '=', 'orders.id')
                    ->whereBetween('orders.created_at', [$startDate, $endDate])
                    ->where('orders.payment_status', 'paid');
            })
            ->groupBy('products.id')
            ->orderByDesc('total_sold')
            ->get();

        return response()->json($products);
    }
}
