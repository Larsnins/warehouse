# Warehouse Management System

A fullstack Vue 3 + Laravel warehouse management application with real-time inventory tracking.

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+
- Node.js 18+
- npm
- Chrome (for dev browser)

### 1. Install & Setup

```powershell
# Install dependencies
composer install
npm install

# Setup Laravel
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### 2. Run Development Servers

**Option A: Auto-open Chrome (recommended)**
```powershell
npm run dev:chrome
```
This starts Vite on `http://localhost:5173` and opens it in Chrome automatically. Then run Laravel in another terminal:

```powershell
php artisan serve
```

**Option B: Manual start**
```powershell
# Terminal 1: Vite dev server
npm run dev

# Terminal 2: Laravel API server
php artisan serve
```

Then open Chrome to `http://localhost:5173`

### 3. Access the App
- **Frontend (SPA):** http://localhost:5173
- **Backend API:** http://localhost:8000/api
- **Demo Data:** Items and orders seeded automatically

## 📦 Architecture

### Frontend (Vue 3 SPA)
- **Entry:** `src/main.js`
- **Components:** `src/components/` (UI components, layouts)
- **Pages:** `src/pages/` (Dashboard, Items, Orders, Reports, Settings)
- **State:** `src/store/` (Pinia stores for items, orders, auth)
- **API Helpers:** `src/api/` (HTTP client, auth, items, orders endpoints)
- **Router:** `src/router/index.js` (Page routing)

### Backend (Laravel)
- **API Routes:** `routes/web.php` (under `/api` prefix)
- **Controllers:** `app/Http/Controllers/Api/` (ItemController, OrderController, AuthController)
- **Models:** `app/Models/` (Item, Order, User)
- **Migrations:** `database/migrations/`
- **Seeders:** `database/seeders/` (Demo data)

## 🎯 Features

- ✅ Dashboard with inventory stats
- ✅ Item CRUD (Create, Read, Update, Delete)
- ✅ Order management
- ✅ Stock tracking & low-stock alerts
- ✅ Reports & analytics
- ✅ Clean, modern UI with Tailwind CSS

## 🔌 API Endpoints

All endpoints under `/api`:

```
POST   /auth/login          - Login user
POST   /auth/logout         - Logout
GET    /auth/me             - Current user

GET    /items               - List all items
GET    /items/{id}          - Get single item
POST   /items               - Create item
PUT    /items/{id}          - Update item
DELETE /items/{id}          - Delete item

GET    /orders              - List all orders
GET    /orders/{id}         - Get single order
POST   /orders              - Create order
```

## 🛠️ Development

### Add a new page
1. Create Vue component in `src/pages/YourPage.vue`
2. Add route in `src/router/index.js`
3. Link from sidebar in `src/App.vue`

### Add API endpoint
1. Create controller in `app/Http/Controllers/Api/`
2. Add route in `routes/web.php` under `/api` prefix
3. Create API helper in `src/api/` if needed
4. Use from Pinia store or component

### Build for production
```powershell
npm run build
php artisan view:clear
```

Output goes to `dist/` folder.

## 📝 Database

SQLite database at `database/database.sqlite` with:
- `users` table (for auth)
- `items` table (inventory)
- `orders` table (order history)

Seed demo data:
```powershell
php artisan db:seed
```

## 🔐 Environment Variables

Key variables in `.env`:
```
APP_URL=http://localhost:8000
VITE_API_BASE=http://localhost:8000/api
DB_CONNECTION=sqlite
```

## 📱 Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- IE 11: ❌

## 🤝 Support

For issues or questions, check:
1. `src/main.css` for styling customization
2. `tailwind.config.js` for Tailwind config
3. `vite.config.ts` for build config
4. Laravel docs: https://laravel.com
5. Vue 3 docs: https://vuejs.org

---

**Happy warehouse managing! 📦**
