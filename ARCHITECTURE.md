# 🏗️ Warehouse Management System - Architecture Guide

**For Beginners: How Vue 3 connects to Laravel**

---

## 📚 Table of Contents
1. [System Overview](#system-overview)
2. [Project Structure](#project-structure)
3. [How Vue Connects to Laravel](#how-vue-connects-to-laravel)
4. [Data Flow Explained](#data-flow-explained)
5. [File Breakdown](#file-breakdown)
6. [Common Tasks](#common-tasks)

---

## 🎯 System Overview

This is a **Single Page Application (SPA)** that:
- Runs completely in the browser using **Vue 3**
- Communicates with a **Laravel API** backend to get/save data
- Does NOT require page refreshes (fast, modern experience)

**Simple analogy:**
- **Vue** = The visual front (what user sees)
- **Laravel** = The brain behind (where data is stored)
- **API** = The messenger between them

---

## 📁 Project Structure

```
warehouse/
├── src/                      ← Vue 3 Frontend Code
│   ├── main.js              ← Entry point (starts Vue app)
│   ├── App.vue              ← Root component (layout, header, sidebar)
│   ├── main.css             ← Theme & global styles
│   ├── pages/               ← Full page components
│   │   ├── LoginPage.vue
│   │   ├── DashboardPage.vue
│   │   ├── ItemsPage.vue
│   │   └── ...
│   ├── components/          ← Reusable UI components
│   │   └── icons/           ← SVG icon components
│   ├── api/                 ← API communication
│   │   ├── http.js          ← Generic fetch wrapper
│   │   ├── items.js         ← Item API calls
│   │   ├── orders.js        ← Order API calls
│   │   └── ...
│   ├── store/               ← State management (Pinia)
│   │   ├── auth.js          ← Authentication state
│   │   ├── items.js         ← Items state
│   │   ├── orders.js        ← Orders state
│   │   └── router/
│   │       └── index.js     ← Route definitions
│   ├── composables/         ← Reusable logic
│   └── css/                 ← Modular CSS files
│
├── app/                      ← Laravel Backend Code
│   ├── Models/              ← Database models (Item, Order, User)
│   ├── Http/
│   │   ├── Controllers/     ← API endpoint handlers
│   │   ├── Requests/        ← Validation rules
│   │   └── Middleware/
│   └── Providers/
│
├── routes/                   ← Laravel API routes
│   ├── web.php              ← Website routes (Inertia renders)
│   └── api.php              ← API endpoints (JSON responses)
│
├── database/
│   ├── migrations/          ← Database structure
│   └── seeders/             ← Sample data
│
├── config/                   ← Configuration files
│   └── fortify.php          ← Authentication config
│
├── vite.config.ts           ← Frontend build tool config
├── tailwind.config.js       ← Tailwind CSS config
└── package.json             ← Frontend dependencies
```

---

## 🔗 How Vue Connects to Laravel

### Step 1: User Loads the App
```
1. Browser visits http://localhost:8000/
2. Laravel renders index.html (public/index.html)
3. index.html loads Vue app from <div id="app"></div>
4. Vue takes over - shows LoginPage
```

### Step 2: Vue Makes a Request to Laravel API
```
Example: User clicks "Load Items"

Vue Component (ItemsPage.vue)
    ↓
Calls: import { getItems } from '@/api/items.js'
    ↓
api/items.js sends HTTP request
    ↓
Laravel Route (routes/api.php)
    ↓
Laravel Controller (ItemController@index)
    ↓
Controller queries database
    ↓
Returns JSON response back to Vue
    ↓
Vue stores data in Pinia store
    ↓
Component displays data in template
```

---

## 📊 Data Flow Explained

### Simplified Example: Loading Items

**File 1: ItemsPage.vue (Vue Component)**
```vue
<script setup>
import { onMounted } from 'vue'
import { useItems } from '@/store/items.js'

const itemStore = useItems()

onMounted(async () => {
  // When page loads, fetch items from API
  await itemStore.fetchItems()
})
</script>

<template>
  <!-- Display items from store -->
  <div v-for="item in itemStore.items" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

**File 2: store/items.js (State Management)**
```javascript
import { defineStore } from 'pinia'
import { getItems } from '@/api/items.js'

export const useItems = defineStore('items', {
  state: () => ({
    items: []
  }),

  actions: {
    async fetchItems() {
      // Call API to get items
      const data = await getItems()
      // Store them
      this.items = data
    }
  }
})
```

**File 3: api/items.js (API Communication)**
```javascript
import { request } from './http.js'

export async function getItems() {
  // Send GET request to Laravel API endpoint
  // URL: /api/items
  return request('/items', { method: 'GET' })
}
```

**File 4: Laravel (app/Http/Controllers/ItemController.php)**
```php
class ItemController {
    public function index() {
        // Get all items from database
        $items = Item::all()

        // Return as JSON
        return response()->json($items)
    }
}
```

**File 5: Laravel Route (routes/api.php)**
```php
Route::get('/items', [ItemController::class, 'index'])
```

---

## 📄 File Breakdown

### Frontend Files (Vue 3)

| File | Purpose | For Beginners |
|------|---------|---------------|
| `src/main.js` | Starts Vue app | Where Vue app begins |
| `src/App.vue` | Main layout | Header, sidebar, page display |
| `src/main.css` | Theme system | Light/dark mode colors |
| `src/pages/*.vue` | Full pages | Login, Dashboard, Items, etc. |
| `src/api/http.js` | Fetch wrapper | Sends requests to Laravel |
| `src/api/items.js` | Item API calls | Methods like `getItems()`, `createItem()` |
| `src/store/items.js` | Item data store | Stores items in memory for fast access |
| `src/store/router/index.js` | URL routing | Maps URLs to pages |

### Backend Files (Laravel)

| File | Purpose | For Beginners |
|------|---------|---------------|
| `routes/api.php` | API routes | Defines endpoints like `/api/items` |
| `app/Http/Controllers/ItemController.php` | API logic | Handles requests, queries database |
| `app/Models/Item.php` | Database model | Represents Item in database |
| `database/migrations/` | Database structure | Creates tables like `items`, `orders` |
| `config/fortify.php` | Authentication | Login/register settings |

---

## 🔄 How API Requests Work

### 1. **Making a Request from Vue**

```javascript
// In Vue component
import { createItem } from '@/api/items.js'

const newItem = {
  name: 'Laptop',
  stock: 10,
  price: 999
}

const result = await createItem(newItem)
```

### 2. **API Layer (api/items.js)**

```javascript
// Prepares the request
export async function createItem(data) {
  return request('/items', {
    method: 'POST',
    body: data
  })
}
```

### 3. **HTTP Wrapper (api/http.js)**

```javascript
// Sends actual request to Laravel
export async function request(path, opts = {}) {
  const base = '/api'  // Laravel API base URL
  const url = base + path  // Full URL: /api/items

  const res = await fetch(url, opts)  // Send HTTP request
  const text = await res.text()

  try {
    return JSON.parse(text)  // Parse JSON response
  } catch {
    return text  // Return raw text if not JSON
  }
}
```

### 4. **Laravel Route (routes/api.php)**

```php
Route::post('/items', [ItemController::class, 'store'])
```

### 5. **Laravel Controller (app/Http/Controllers/ItemController.php)**

```php
public function store(Request $request) {
  // Validate input
  $validated = $request->validate([
    'name' => 'required|string',
    'stock' => 'required|integer',
    'price' => 'required|numeric'
  ])

  // Create item in database
  $item = Item::create($validated)

  // Return created item as JSON
  return response()->json($item)
}
```

### 6. **Vue Receives Response**

```javascript
// Back in Vue component
const result = await createItem(newItem)
console.log(result)  // New item with ID from database
```

---

## 🎨 Understanding the Theme System

### Light Mode vs Dark Mode

All colors are stored as **CSS Variables** in `src/main.css`:

```css
:root {
  /* Light Mode (default) */
  --bg-primary: #ffffff;      /* Page background - white */
  --text-primary: #1a202c;    /* Main text - dark */
  --header-bg: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
}

html.dark {
  /* Dark Mode (when user toggles) */
  --bg-primary: #0f0f0f;      /* Page background - black */
  --text-primary: #ffffff;    /* Main text - white */
  --header-bg: linear-gradient(135deg, #3b0f0f 30%, #120707 100%);
}
```

### How it Works

1. User clicks theme toggle button (sun/moon icon)
2. Vue adds `class="dark"` to `<html>` element
3. CSS automatically uses dark mode variables
4. All colors update instantly!

---

## 🛠️ Common Tasks for Beginners

### Add a New Page

**Step 1:** Create page component
```vue
<!-- src/pages/MyNewPage.vue -->
<template>
  <div class="main">
    <h2>My New Page</h2>
    <!-- Your content here -->
  </div>
</template>

<script setup>
// Your Vue logic here
</script>
```

**Step 2:** Add route
```javascript
// src/store/router/index.js
const routes = [
  // ... existing routes
  { path: '/mynewpage', name: 'mynewpage', component: MyNewPage }
]
```

**Step 3:** Add navigation link
```vue
<!-- src/App.vue sidebar -->
<li>
  <router-link to="/mynewpage" class="nav-link">
    My New Page
  </router-link>
</li>
```

### Add a New API Call

**Step 1:** Create API function
```javascript
// src/api/mynewfeature.js
import { request } from './http.js'

export async function getMyData() {
  return request('/mynewfeature', { method: 'GET' })
}

export async function createMyData(data) {
  return request('/mynewfeature', {
    method: 'POST',
    body: data
  })
}
```

**Step 2:** Use in store or component
```javascript
import { getMyData } from '@/api/mynewfeature.js'

const data = await getMyData()
```

### Add a New Laravel Endpoint

**Step 1:** Create Laravel route
```php
// routes/api.php
Route::get('/mynewfeature', [MyFeatureController::class, 'index'])
Route::post('/mynewfeature', [MyFeatureController::class, 'store'])
```

**Step 2:** Create controller
```php
// app/Http/Controllers/MyFeatureController.php
class MyFeatureController {
    public function index() {
        return response()->json([])
    }

    public function store(Request $request) {
        return response()->json([])
    }
}
```

**Step 3:** Call from Vue (as shown above)

---

## 📖 Key Concepts

### Vue 3 Composition API
```javascript
import { ref, computed, onMounted } from 'vue'

// ref = reactive variable
const count = ref(0)

// computed = automatically updates when dependencies change
const doubled = computed(() => count.value * 2)

// onMounted = runs code when component loads
onMounted(() => {
  console.log('Component mounted!')
})
```

### Pinia Store (State Management)
```javascript
// Stores data globally, accessible from any component
export const useMyStore = defineStore('mystore', {
  state: () => ({
    items: []
  }),
  getters: {
    // Derived data
    itemCount: (state) => state.items.length
  },
  actions: {
    // Methods to change state
    addItem(item) {
      this.items.push(item)
    }
  }
})
```

### CSS Variables (Theming)
```css
/* Define in :root */
:root {
  --main-color: #dc2626;
}

/* Use anywhere */
.button {
  background: var(--main-color);
}

/* Change for dark mode */
html.dark {
  --main-color: #991b1b;
}
```

---

## ✅ Checklist for New Features

- [ ] Create Vue page component
- [ ] Add route to router
- [ ] Add API function
- [ ] Create Laravel controller
- [ ] Add Laravel route
- [ ] Create Pinia store (if needed)
- [ ] Add navigation link
- [ ] Test in browser

---

## 🚀 Running the Project

### Development Mode
```bash
# Terminal 1: Start Laravel API
php artisan serve

# Terminal 2: Start Vue dev server
npm run dev
```

### Build for Production
```bash
npm run build
php artisan optimize
```

---

## 💡 Tips for Beginners

1. **Always check Console** - Press F12 → Console tab to see errors
2. **Use Vue DevTools** - Browser extension to debug Vue state
3. **Read Error Messages** - They tell you exactly what's wrong
4. **Keep It Simple** - Start with one feature at a time
5. **Follow the Pattern** - Copy existing code structure
6. **Test Endpoints** - Use Postman or curl to test Laravel API before Vue
7. **Check Network Tab** - See actual HTTP requests/responses

---

## 📞 File Reference Quick Links

- **Authentication**: `app/Providers/FortifyServiceProvider.php`
- **Database Models**: `app/Models/` (Item.php, Order.php, User.php)
- **API Routes**: `routes/api.php`
- **Frontend Routes**: `src/store/router/index.js`
- **Theme Colors**: `src/main.css` (search for `:root`)
- **API Functions**: `src/api/` folder

---

**Happy coding! 🎉 Start with understanding one feature, then you'll understand the whole system!**
