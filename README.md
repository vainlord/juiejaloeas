# Bakehouse POS System

Modern Point of Sales (POS) system built with Laravel API backend and Next.js frontend. Designed specifically for bakehouse/bakery business management with comprehensive features including order management, table reservations, inventory tracking, and real-time reporting.

## 🎨 Features

- **Point of Sales** - Modern, intuitive POS interface with cart management
- **Order Management** - Track orders from kitchen to delivery with real-time updates
- **Table Management** - Multi-floor table reservation and occupancy tracking
- **Billing Queue** - Manage active orders and customer billing efficiently
- **Inventory** - Product management with stock tracking and alerts
- **Reports & Analytics** - Sales reports, customer analytics, and revenue tracking
- **Team Management** - User roles and permissions for staff
- **Promotions** - Discount codes and voucher management

## 🛠 Tech Stack

### Backend
- **Laravel 11** - PHP framework for REST API
- **MySQL 8.0** - Primary database
- **Laravel Sanctum** - API authentication
- **Laravel Queue** - Background job processing
- **Redis** - Caching and queue management
- **Pusher/Laravel Echo** - Real-time broadcasting

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📁 Project Structure

```
juiejaloeas/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   ├── Models/
│   │   ├── Jobs/
│   │   └── Events/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   └── ...
│
└── frontend/                # Next.js App
    ├── app/
    │   ├── pos/            # POS interface
    │   ├── activity/       # Order history
    │   ├── report/         # Analytics dashboard
    │   ├── inventory/      # Product management
    │   └── ...
    ├── components/         # Reusable UI components
    ├── lib/               # Utilities and API client
    └── store/             # Zustand stores
```

## 🚀 Getting Started

### Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18.x
- MySQL >= 8.0
- Redis (optional, for caching)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Configure environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Update `.env` with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bakehouse_pos
DB_USERNAME=root
DB_PASSWORD=your_password
```

5. Run migrations:
```bash
php artisan migrate
```

6. Seed database (optional):
```bash
php artisan db:seed
```

7. Start Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.local.example .env.local
```

Update `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🗄 Database Schema

### Core Tables

- **users** - System users (cashiers, managers, admin)
- **categories** - Product categories
- **products** - Menu items with pricing and stock
- **tables** - Restaurant tables with floor and capacity
- **customers** - Customer information and history
- **orders** - Order transactions
- **order_items** - Individual items in orders
- **promotions** - Discount codes and campaigns

## 🔐 Authentication

The system uses Laravel Sanctum for API authentication:

1. Login endpoint: `POST /api/login`
2. Returns access token
3. Include token in Authorization header: `Bearer {token}`
4. Frontend stores token in localStorage

## 📊 Key Features Detail

### POS Interface
- Product grid with category filters
- Real-time cart updates
- Table assignment
- Order type selection (Dine-in, Take-away, Delivery)
- Tax and discount calculation
- Multiple payment methods (Cash, Card, QRIS, E-wallet)

### Order Management
- Track order status (Pending → Kitchen → Served → Done)
- Order history with filtering
- Customer order tracking
- Notes and special instructions

### Table Management
- Multi-floor support (1st Floor, 2nd Floor, etc.)
- Table status (Available, Reserved, Occupied)
- Capacity management
- Real-time table updates

### Reports
- Daily/Monthly sales reports
- Top-selling products
- Customer analytics
- Revenue trends with charts
- Export functionality

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Backend (Laravel)

1. Configure production environment
2. Set APP_ENV=production
3. Optimize configuration:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Frontend (Next.js)

1. Build for production:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

Or deploy to Vercel/Netlify for automatic deployments.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer**: Droid AI by Factory
- **Client**: Alfan Syah (@vainlord)

## 📧 Support

For support, email support@bakehouse-pos.com or open an issue in the repository.

---

Built with ❤️ using Laravel & Next.js
