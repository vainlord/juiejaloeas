<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['customer', 'table', 'user', 'items.product']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by payment status
        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        // Filter by type (dine-in, takeaway)
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by date range
        if ($request->has('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['customer', 'table', 'user', 'items.product'])->findOrFail($id);

        return response()->json($order);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'table_id' => 'nullable|exists:tables,id',
            'type' => 'required|in:dine-in,takeaway',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
            'payment_method' => 'nullable|in:cash,card,qris',
            'discount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            // Generate order number
            $orderNumber = 'ORD-'.date('Ymd').'-'.str_pad(Order::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT);

            // Calculate totals
            $subtotal = 0;
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $subtotal += $product->price * $item['quantity'];
            }

            $tax = $subtotal * 0.1; // 10% tax
            $discount = $validated['discount'] ?? 0;
            $total = $subtotal + $tax - $discount;

            // Create order
            $order = Order::create([
                'order_number' => $orderNumber,
                'customer_id' => $validated['customer_id'] ?? null,
                'table_id' => $validated['table_id'] ?? null,
                'user_id' => auth()->id(),
                'type' => $validated['type'],
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $validated['payment_method'] ?? null,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'discount' => $discount,
                'total' => $total,
                'notes' => $validated['notes'] ?? null,
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $product->price * $item['quantity'],
                    'notes' => $item['notes'] ?? null,
                ]);

                // Update stock
                $product->decrement('stock', $item['quantity']);
            }

            // Update customer stats if customer exists
            if ($order->customer_id) {
                $customer = Customer::find($order->customer_id);
                $customer->increment('total_visits');
                $customer->increment('total_spent', $total);
            }

            DB::commit();

            return response()->json($order->load(['customer', 'table', 'items.product']), 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['error' => 'Failed to create order: '.$e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,preparing,ready,completed,cancelled',
            'payment_status' => 'sometimes|in:pending,paid,refunded',
            'payment_method' => 'nullable|in:cash,card,qris',
            'notes' => 'nullable|string',
        ]);

        // If payment status changes to paid, record timestamp
        if (isset($validated['payment_status']) && $validated['payment_status'] === 'paid' && $order->payment_status !== 'paid') {
            $validated['paid_at'] = now();
        }

        // If status changes to completed, record timestamp
        if (isset($validated['status']) && $validated['status'] === 'completed' && $order->status !== 'completed') {
            $validated['completed_at'] = now();
        }

        $order->update($validated);

        return response()->json($order->load(['customer', 'table', 'items.product']));
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully',
        ]);
    }
}
