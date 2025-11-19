# 🚀 GETTING STARTED - For Absolute Beginners

Welcome! This guide explains the project in the simplest way possible.

---

## 📖 What is This Project?

This is an **Inventory Management System** - a website where you can:
- ✅ View all items in stock
- ✅ Add new items
- ✅ Edit items
- ✅ Delete items
- ✅ View orders
- ✅ See reports

**The cool part:** It never reloads! It's super fast because Vue 3 handles everything without refreshing.

---

## 🎯 The Basics

### What is Vue 3?
Vue is a tool that makes interactive websites. It updates the page WITHOUT refreshing, making it feel snappy and modern.

**Analogy:** 
- Websites made in the 1990s: Every click = page reload (like going to a new page)
- Vue websites: Click something = just updates that part (like magic!)

### What is Laravel?
Laravel is where your data lives. It's like a database keeper that:
- Stores information (items, orders, users)
- Receives requests from Vue ("Give me all items!")
- Sends back data ("Here are all items!")

### How Do They Work Together?

```
You (User)
    ↓
Click button in Vue ← (What you see in browser)
    ↓
Vue asks Laravel "What items do we have?"
    ↓
Laravel checks database and responds "Here they are!"
    ↓
Vue displays items on the page
    ↓
You see the results
```

---

## 📁 Where Is Everything?

### Frontend (Vue) - `src/` folder
This is what YOU see in your browser.

```
src/
├── pages/              ← Full pages (Login, Dashboard, Items, etc.)
├── components/         ← Reusable pieces (buttons, cards, etc.)
├── api/                ← How Vue talks to Laravel
├── store/              ← Where data lives when app is running
└── css/                ← Styling (colors, fonts, sizes)
```

### Backend (Laravel) - `app/` and `routes/` folders
This is where data lives and is processed.

```
app/
├── Models/             ← Item, Order, User (database structures)
└── Http/
    └── Controllers/    ← The "brains" that handle requests

routes/
├── api.php             ← URLs for Vue to call (API endpoints)
└── web.php             ← Regular website routes
```

---

## 🔄 Understanding the Request-Response Cycle

**Scenario: User clicks "Load Items"**

### Step 1: Vue Component (What user interacts with)
```vue
<button @click="loadItems">Load Items</button>
```

### Step 2: Vue calls API function
```javascript
import { listItems } from '@/api/items.js'

const items = await listItems()  // ← This calls Laravel
```

### Step 3: API Function sends HTTP request
```javascript
// Inside api/items.js
export function listItems() {
  return request('/items', { method: 'GET' })
}
```

### Step 4: HTTP wrapper sends actual request
```javascript
// Inside api/http.js
const res = await fetch('/api/items', { method: 'GET' })
```

### Step 5: Laravel Route receives request
```php
// routes/api.php
Route::get('/items', [ItemController::class, 'index'])
```

### Step 6: Laravel Controller handles it
```php
// app/Http/Controllers/ItemController.php
public function index() {
    return response()->json(Item::all())  // Get all items
}
```

### Step 7: Database returns items
Laravel queries the `items` table and gets all records.

### Step 8: Laravel sends JSON response
```json
[
  { "id": 1, "name": "Laptop", "stock": 5 },
  { "id": 2, "name": "Mouse", "stock": 20 }
]
```

### Step 9: Vue receives response
```javascript
const items = await listItems()
// items = [{ id: 1, name: "Laptop", ... }, ...]
```

### Step 10: Vue displays it
```vue
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

**Result:** User sees items on the page!

---

## 🎨 Understanding the Theme System

The app has **Light Mode** and **Dark Mode**. Here's how it works:

### Light Mode (Default)
- White backgrounds
- Dark text
- Red accents

### Dark Mode (When user clicks moon icon)
- Black backgrounds
- White text
- Dark red accents

### How the Magic Works

**File: `src/main.css`**
```css
:root {
  --bg-primary: #ffffff;      /* Light mode: white */
  --text-primary: #1a202c;    /* Light mode: dark text */
}

html.dark {
  --bg-primary: #0f0f0f;      /* Dark mode: black */
  --text-primary: #ffffff;    /* Dark mode: white text */
}
```

**In HTML/CSS:**
```html
<div style="background: var(--bg-primary); color: var(--text-primary);">
  Hello World
</div>
```

**What happens when user clicks theme toggle:**
1. JavaScript adds `class="dark"` to `<html>` element
2. CSS switches all colors automatically
3. All colors update instantly!

No need to change any code or make new requests!

---

## 🔐 How Authentication Works

### Login Flow

1. **User enters email/password** → Submitted to Laravel
2. **Laravel validates** → Checks if user exists and password is correct
3. **If valid** → Laravel creates session (stores "user logged in")
4. **Vue checks** → "Am I logged in?" → Laravel says "Yes!"
5. **Vue shows dashboard** → Instead of login page
6. **User can now use the app**

### Logout Flow

1. **User clicks "Logout"**
2. **Vue calls logout API**
3. **Laravel destroys session** → "User is no longer logged in"
4. **Vue redirects to login page**
5. **Done!**

---

## 📝 File Types Explained

| Extension | What It Is | For Beginners |
|-----------|-----------|--------------|
| `.vue` | Vue component | HTML + JavaScript + CSS together |
| `.js` | JavaScript file | Runs logic in browser or backend |
| `.json` | Data format | Structured data (like a form) |
| `.css` | Stylesheet | Colors, fonts, sizes, layouts |
| `.php` | PHP code | Runs on server (Laravel) |
| `.md` | Markdown file | Documentation (like this!) |

---

## 🛠️ Common Beginner Tasks

### Task 1: Add a New Button

**File: `src/App.vue`**
```vue
<template>
  <button @click="doSomething">Click Me!</button>
</template>

<script setup>
function doSomething() {
  console.log('Button clicked!')
}
</script>
```

### Task 2: Display Data from Laravel

**Step 1: Create API function** (`src/api/myfeature.js`)
```javascript
import { request } from './http.js'

export function getMyData() {
  return request('/myendpoint')
}
```

**Step 2: Use in component** (`src/pages/MyPage.vue`)
```vue
<template>
  <div>
    <p v-for="item in myData" :key="item.id">
      {{ item.name }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyData } from '@/api/myfeature.js'

const myData = ref([])

onMounted(async () => {
  myData.value = await getMyData()
})
</script>
```

**Step 3: Create Laravel endpoint** (`routes/api.php`)
```php
Route::get('/myendpoint', [MyController::class, 'index'])
```

**Step 4: Create controller** (`app/Http/Controllers/MyController.php`)
```php
public function index() {
  return response()->json(['status' => 'ok'])
}
```

---

## 🐛 Debugging Tips

### See What's Happening

**Open Developer Tools:**
- Press `F12` on keyboard
- Click "Console" tab
- You'll see messages and errors

**Example Console Messages:**
```
✓ App mounted. API Base: /api
```

If there's an error, it shows there! This helps you find bugs.

### Network Tab

- Press `F12`
- Click "Network" tab
- Do something in the app
- See actual HTTP requests/responses!

Shows you exactly what Vue is sending to Laravel and what Laravel is sending back.

---

## ✅ Checklist: Your First Feature

Follow these steps to add a complete feature:

- [ ] Create `.vue` file in `src/pages/`
- [ ] Add route in `src/store/router/index.js`
- [ ] Add navigation link in `src/App.vue`
- [ ] Create API function in `src/api/`
- [ ] Create Laravel controller in `app/Http/Controllers/`
- [ ] Add route in `routes/api.php`
- [ ] Test by clicking the link in the app
- [ ] Check console (F12) for errors
- [ ] Debug if something doesn't work

---

## 🎓 Learning Order

Start with these in order:

1. **Understand the file structure** → Read ARCHITECTURE.md
2. **Understand how Vue works** → Play with src/App.vue
3. **Understand how API calls work** → Look at src/api/items.js
4. **Understand Laravel routes** → Look at routes/api.php
5. **Understand the database** → Look at app/Models/
6. **Build something small** → Add a new feature!

---

## 🚀 Running the App

### Start Development Server

**Terminal 1: Laravel Backend**
```bash
php artisan serve
```
Keeps running, shows Laravel server running at `http://localhost:8000`

**Terminal 2: Vue Frontend**
```bash
npm run dev
```
Keeps running, shows Vue dev server at `http://localhost:5173` (or similar)

### Use the App

Open browser, go to `http://localhost:8000`
- You'll see the login page
- Enter credentials
- Start using the app!

---

## 💡 Important Concepts

### Reactive Variables (Vue)
```javascript
import { ref } from 'vue'

const count = ref(0)  // Wrapped in ref()

count.value++  // Access with .value

// In template, just use {{ count }}
```

### Async/Await (JavaScript)
```javascript
// Old way (confusing)
listItems().then(items => { /* do something */ })

// New way (clearer)
const items = await listItems()  // Wait for response
console.log(items)  // Then use it
```

### HTTP Methods (API)
- **GET** = Retrieve data ("Show me the items")
- **POST** = Create data ("Add a new item")
- **PUT** = Update data ("Change item name")
- **DELETE** = Remove data ("Remove item")

---

## 🆘 When Something Goes Wrong

**App doesn't start?**
- Check console (F12)
- Read the error message
- Search the error on Google
- Ask in Stack Overflow

**API request fails?**
- Check Network tab (F12)
- See what URL it's trying to access
- Check if Laravel server is running
- Check if route exists in `routes/api.php`

**Data doesn't show?**
- Check Network tab - was request sent?
- Check Laravel response - what did it return?
- Check Vue console - any JavaScript errors?

---

## 📚 Next Steps

1. Read `ARCHITECTURE.md` for detailed explanations
2. Explore `src/pages/ItemsPage.vue` to see a real example
3. Create your first new page following the pattern
4. Celebrate! 🎉

---

**Remember:** Every expert was once a beginner. Take your time, explore the code, and have fun!

If you're stuck, check the ARCHITECTURE.md file or look at existing code - the patterns are consistent and easy to copy! 💪
