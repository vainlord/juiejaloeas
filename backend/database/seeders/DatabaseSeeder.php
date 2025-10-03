<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@bakehouse.com',
            'password' => Hash::make('password'),
        ]);

        // Create categories
        $categories = [
            ['name' => 'Breads', 'slug' => 'breads', 'icon' => '🍞', 'sort_order' => 1, 'is_active' => true],
            ['name' => 'Pastries', 'slug' => 'pastries', 'icon' => '🥐', 'sort_order' => 2, 'is_active' => true],
            ['name' => 'Cakes', 'slug' => 'cakes', 'icon' => '🎂', 'sort_order' => 3, 'is_active' => true],
            ['name' => 'Cookies', 'slug' => 'cookies', 'icon' => '🍪', 'sort_order' => 4, 'is_active' => true],
            ['name' => 'Beverages', 'slug' => 'beverages', 'icon' => '☕', 'sort_order' => 5, 'is_active' => true],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create products
        $products = [
            // Breads
            ['category_id' => 1, 'name' => 'Sourdough Bread', 'slug' => 'sourdough-bread', 'price' => 45000, 'cost_price' => 25000, 'stock' => 50, 'min_stock' => 10, 'sku' => 'BRD001', 'is_active' => true, 'is_featured' => true],
            ['category_id' => 1, 'name' => 'Whole Wheat Bread', 'slug' => 'whole-wheat-bread', 'price' => 35000, 'cost_price' => 20000, 'stock' => 40, 'min_stock' => 10, 'sku' => 'BRD002', 'is_active' => true],
            ['category_id' => 1, 'name' => 'French Baguette', 'slug' => 'french-baguette', 'price' => 38000, 'cost_price' => 22000, 'stock' => 35, 'min_stock' => 10, 'sku' => 'BRD003', 'is_active' => true],

            // Pastries
            ['category_id' => 2, 'name' => 'Croissant', 'slug' => 'croissant', 'price' => 28000, 'cost_price' => 15000, 'stock' => 60, 'min_stock' => 15, 'sku' => 'PST001', 'is_active' => true, 'is_featured' => true],
            ['category_id' => 2, 'name' => 'Pain au Chocolat', 'slug' => 'pain-au-chocolat', 'price' => 32000, 'cost_price' => 18000, 'stock' => 45, 'min_stock' => 10, 'sku' => 'PST002', 'is_active' => true],
            ['category_id' => 2, 'name' => 'Danish Pastry', 'slug' => 'danish-pastry', 'price' => 30000, 'cost_price' => 16000, 'stock' => 40, 'min_stock' => 10, 'sku' => 'PST003', 'is_active' => true],

            // Cakes
            ['category_id' => 3, 'name' => 'Chocolate Cake', 'slug' => 'chocolate-cake', 'price' => 250000, 'cost_price' => 120000, 'stock' => 15, 'min_stock' => 3, 'sku' => 'CKE001', 'is_active' => true, 'is_featured' => true],
            ['category_id' => 3, 'name' => 'Red Velvet Cake', 'slug' => 'red-velvet-cake', 'price' => 280000, 'cost_price' => 140000, 'stock' => 12, 'min_stock' => 3, 'sku' => 'CKE002', 'is_active' => true],
            ['category_id' => 3, 'name' => 'Cheese Cake', 'slug' => 'cheese-cake', 'price' => 220000, 'cost_price' => 100000, 'stock' => 10, 'min_stock' => 2, 'sku' => 'CKE003', 'is_active' => true],

            // Cookies
            ['category_id' => 4, 'name' => 'Chocolate Chip Cookies', 'slug' => 'chocolate-chip-cookies', 'price' => 55000, 'cost_price' => 30000, 'stock' => 80, 'min_stock' => 20, 'sku' => 'COK001', 'is_active' => true],
            ['category_id' => 4, 'name' => 'Oatmeal Cookies', 'slug' => 'oatmeal-cookies', 'price' => 50000, 'cost_price' => 28000, 'stock' => 70, 'min_stock' => 20, 'sku' => 'COK002', 'is_active' => true],
            ['category_id' => 4, 'name' => 'Macaron Assorted', 'slug' => 'macaron-assorted', 'price' => 85000, 'cost_price' => 45000, 'stock' => 50, 'min_stock' => 10, 'sku' => 'COK003', 'is_active' => true, 'is_featured' => true],

            // Beverages
            ['category_id' => 5, 'name' => 'Espresso', 'slug' => 'espresso', 'price' => 25000, 'cost_price' => 8000, 'stock' => 999, 'min_stock' => 0, 'sku' => 'BEV001', 'is_active' => true],
            ['category_id' => 5, 'name' => 'Cappuccino', 'slug' => 'cappuccino', 'price' => 32000, 'cost_price' => 12000, 'stock' => 999, 'min_stock' => 0, 'sku' => 'BEV002', 'is_active' => true, 'is_featured' => true],
            ['category_id' => 5, 'name' => 'Latte', 'slug' => 'latte', 'price' => 35000, 'cost_price' => 13000, 'stock' => 999, 'min_stock' => 0, 'sku' => 'BEV003', 'is_active' => true],
            ['category_id' => 5, 'name' => 'Orange Juice', 'slug' => 'orange-juice', 'price' => 28000, 'cost_price' => 10000, 'stock' => 999, 'min_stock' => 0, 'sku' => 'BEV004', 'is_active' => true],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        // Create tables
        $tables = [
            ['table_number' => '1', 'floor' => 'Ground Floor', 'capacity' => 2, 'status' => 'available', 'is_active' => true],
            ['table_number' => '2', 'floor' => 'Ground Floor', 'capacity' => 4, 'status' => 'available', 'is_active' => true],
            ['table_number' => '3', 'floor' => 'Ground Floor', 'capacity' => 4, 'status' => 'available', 'is_active' => true],
            ['table_number' => '4', 'floor' => 'Ground Floor', 'capacity' => 6, 'status' => 'available', 'is_active' => true],
            ['table_number' => '5', 'floor' => 'First Floor', 'capacity' => 2, 'status' => 'available', 'is_active' => true],
            ['table_number' => '6', 'floor' => 'First Floor', 'capacity' => 4, 'status' => 'available', 'is_active' => true],
            ['table_number' => '7', 'floor' => 'First Floor', 'capacity' => 4, 'status' => 'available', 'is_active' => true],
            ['table_number' => '8', 'floor' => 'First Floor', 'capacity' => 8, 'status' => 'available', 'is_active' => true],
        ];

        foreach ($tables as $tableData) {
            Table::create($tableData);
        }

        // Create sample customers
        $customers = [
            ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '081234567890', 'total_visits' => 5, 'total_spent' => 750000],
            ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'phone' => '081234567891', 'total_visits' => 3, 'total_spent' => 450000],
            ['name' => 'Bob Wilson', 'email' => 'bob@example.com', 'phone' => '081234567892', 'total_visits' => 8, 'total_spent' => 1200000],
        ];

        foreach ($customers as $customerData) {
            Customer::create($customerData);
        }
    }
}
