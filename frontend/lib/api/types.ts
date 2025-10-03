export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  price: number;
  cost_price?: number;
  stock: number;
  min_stock?: number;
  sku?: string;
  barcode?: string;
  is_active: boolean;
  is_featured: boolean;
  category?: Category;
  created_at: string;
  updated_at: string;
}

export interface Table {
  id: number;
  table_number: string;
  floor?: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  total_visits: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  notes?: string;
  product?: Product;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id?: number;
  table_id?: number;
  user_id: number;
  type: 'dine-in' | 'takeaway';
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: 'cash' | 'card' | 'qris';
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  paid_at?: string;
  completed_at?: string;
  customer?: Customer;
  table?: Table;
  user?: User;
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface CreateOrderRequest {
  customer_id?: number;
  table_id?: number;
  type: 'dine-in' | 'takeaway';
  items: {
    product_id: number;
    quantity: number;
    notes?: string;
  }[];
  payment_method?: 'cash' | 'card' | 'qris';
  discount?: number;
  notes?: string;
}

export interface DashboardReport {
  summary: {
    total_sales: number;
    total_orders: number;
    total_customers: number;
    avg_order_value: number;
  };
  sales_by_date: {
    date: string;
    total: number;
    count: number;
  }[];
  top_products: (Product & { total_sold: number })[];
  recent_orders: Order[];
}
