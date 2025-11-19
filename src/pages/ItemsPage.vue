<template>
  <div>
    <!-- Header with Add Button -->
    <div class="header">
      <h2>📦 Inventory Management</h2>
      <router-link to="/items/add" class="btn btn-primary">
        ➕ Add New Item
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading inventory...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="items.length === 0" class="empty-state-card">
      <p>📭 No items in inventory. <router-link to="/items/add" class="add-link">Add your first item</router-link>.</p>
    </div>

    <!-- Items Table -->
    <div v-else class="table-card">
      <table class="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Current Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="table-row">
            <td class="id-cell">#{{ item.id }}</td>
            <td class="name-cell">{{ item.name }}</td>
            <td class="stock-cell"><span class="stock-badge">{{ item.stock }}</span></td>
            <td class="status-cell">
              <span v-if="item.stock < 10" class="status-badge status-danger">🚨 Low Stock</span>
              <span v-else-if="item.stock < 50" class="status-badge status-warning">⚠️ Medium</span>
              <span v-else class="status-badge status-success">✓ In Stock</span>
            </td>
            <td class="actions-cell">
              <router-link :to="`/items/${item.id}/edit`" class="btn btn-secondary">✏️ Edit</router-link>
              <button @click="deleteItem(item.id)" class="btn btn-danger">🗑️ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useItemsStore } from '../store/items.js'

interface Item {
  id: number
  name: string
  stock: number
}

const store = useItemsStore()
const items = ref<Item[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    await store.fetch()
    items.value = store.items as Item[]
  } finally {
    loading.value = false
  }
})

const deleteItem = async (id: number) => {
  if (confirm('Are you sure you want to delete this item?')) {
    await store.remove(id)
    items.value = items.value.filter(i => i.id !== id)
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h2 {
  color: #1a202c;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.btn {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #dc2626;
  color: white;
  border: none;
}

.btn-secondary {
  background-color: #2563eb;
  color: white;
  border: none;
}

.btn-danger {
  background-color: #991b1b;
  color: white;
  border: none;
  margin-left: 6px;
}

/* Loading spinner */
.loading {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #fee2e2;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty state */
.empty-state-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);
  border: 2px dashed #fca5a5;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
}

.add-link {
  color: #dc2626;
  font-weight: 600;
}

/* Table */
.table-card {
  background: white;
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
}

.items-table th {
  padding: 12px;
  text-align: left;
  font-weight: 700;
  color: #991b1b;
  background-color: #fee2e2;
}

.items-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.table-row:hover {
  background: #fef2f2;
}

.id-cell {
  color: #9ca3af;
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

.name-cell {
  font-weight: 600;
}

.stock-cell {
  text-align: center;
}

.stock-badge {
  background: #fee2e2;
  color: #dc2626;
  padding: 4px 8px;
  border-radius: 6px;
}

.status-cell {
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.status-danger {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.status-warning {
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fcd34d;
}

.status-success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.actions-cell {
  text-align: right;
}
</style>
