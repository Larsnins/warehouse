<template>
  <div>
    <!-- Header with Add Button -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 style="color: #1a202c; font-size: 28px; font-weight: 700; margin: 0;">📦 Inventory Management</h2>
      <router-link to="/items/add" class="btn btn-primary">
        ➕ Add New Item
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p style="color: #9ca3af; font-weight: 500;">Loading inventory...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="items.length === 0" class="empty-state-card">
      <p style="color: #6b7280; text-align: center; font-size: 16px; margin: 0;">
        📭 No items in inventory. <router-link to="/items/add" style="color: #dc2626; font-weight: 600;">Add your first item</router-link>.
      </p>
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
            <td class="name-cell"><strong>{{ item.name }}</strong></td>
            <td class="stock-cell">
              <span class="stock-badge">{{ item.stock }}</span>
            </td>
            <td class="status-cell">
              <span v-if="item.stock < 10" class="status-badge status-danger">
                🚨 Low Stock
              </span>
              <span v-else-if="item.stock < 50" class="status-badge status-warning">
                ⚠️ Medium
              </span>
              <span v-else class="status-badge status-success">
                ✓ In Stock
              </span>
            </td>
            <td class="actions-cell">
              <router-link
                :to="`/items/${item.id}/edit`"
                class="btn btn-secondary"
                style="padding: 6px 12px; font-size: 12px; display: inline-block;"
              >
                ✏️ Edit
              </router-link>
              <button
                @click="deleteItem(item.id)"
                class="btn btn-danger"
                style="padding: 6px 12px; font-size: 12px; display: inline-block; margin-left: 6px;"
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useItemsStore } from '../store/items.js';
import '../css/pages/ItemsPage.css';

const store = useItemsStore();
const loading = ref(true);
const items = ref<any[]>([]);

onMounted(async () => {
  try {
    await store.fetch();
    items.value = store.items;
  } finally {
    loading.value = false;
  }
});

const deleteItem = async (id: any) => {
  if (confirm('Are you sure you want to delete this item?')) {
    await store.remove(id);
  }
};
</script>

<style scoped>
.empty-state-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);
  border: 2px dashed #fca5a5;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
}

.table-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(220, 38, 38, 0.08);
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.items-table thead {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.items-table th {
  padding: 14px;
  text-align: left;
  font-weight: 700;
  color: #991b1b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #fca5a5;
}

.table-row {
  border-bottom: 1px solid #e5e7eb;
  transition: background 0.2s ease;
}

.table-row:hover {
  background: #fef2f2;
}

.table-row td {
  padding: 14px;
  color: #374151;
  font-size: 14px;
}

.id-cell {
  color: #9ca3af;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.name-cell {
  color: #1a202c;
  font-weight: 600;
}

.stock-cell {
  text-align: center;
}

.stock-badge {
  background: linear-gradient(135deg, #fecaca 0%, #fee2e2 100%);
  color: #dc2626;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
}

.status-cell {
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
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
  white-space: nowrap;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #fee2e2;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
