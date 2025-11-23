<template>
  <div class="page">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-slate-800">Inventory</h2>
        <div class="flex items-center gap-2">
            <router-link to="/items/add" class="px-3 bg-red-700 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"><span>+ Add item</span></router-link>
            <button @click="refetchAll" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Refresh</button>
            <button @click="handleExportData" class="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Export CSV</button>
          </div>
    </div>

    <div v-if="loading" class="text-center py-16">
      <div class="mx-auto w-10 h-10 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
      <p class="mt-4 text-slate-600">Loading inventory...</p>
    </div>

    <div v-else-if="items.length === 0" class="rounded-lg p-8 bg-red-50 border border-red-100 text-center">
      <p class="text-slate-700">No items in inventory. <router-link to="/items/add" class="text-red-600 font-semibold">Add your first item</router-link>.</p>
    </div>

    <div v-else class="ui-card overflow-x-auto">
      <table class="w-full min-w-[640px] table-auto">
        <thead class="bg-red-50 text-left text-sm font-semibold text-red-700">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Item Name</th>
            <th class="px-4 py-3 text-center">Current Stock</th>
            <th class="px-4 py-3 text-center">Status</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="hover:bg-red-50">
            <td class="px-4 py-3 text-sm text-slate-500">#{{ item.id }}</td>
            <td class="px-4 py-3 font-medium text-slate-800">{{ item.name }}</td>
            <td class="px-4 py-3 text-center"><span class="inline-flex items-center px-2 py-0.5 rounded-md text-sm font-semibold bg-red-50 text-red-700">{{ item.stock }}</span></td>
            <td class="px-4 py-3 text-center">
              <span v-if="item.stock < 10" class="inline-flex items-center gap-2 text-sm font-semibold text-red-700">🚨 Low</span>
              <span v-else-if="item.stock < 50" class="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">⚠️ Medium</span>
              <span v-else class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">✓ In Stock</span>
            </td>
            <td class="px-4 py-3 text-right">
              <router-link :to="`/items/${item.id}/edit`" class="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-md bg-sky-600 text-white hover:bg-sky-700">
                <PencilSquareIcon class="w-4 h-4" />
                Edit
              </router-link>
              <button @click="deleteItem(item.id)" class="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-md bg-rose-600 text-white hover:bg-rose-700 ml-2">
                <TrashIcon class="w-4 h-4" />
                Delete
              </button>
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
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

interface Item {
  id: number
  name: string
  stock: number
}

async function refetchAll() {
  loading.value = true
  await Promise.all([itemsStore.fetch(), ordersStore.fetch()])
  loading.value = false
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
/* Styling moved to Tailwind utility classes in the template. */
</style>
