<template>
  <div class="page section-stack compact">
    <h2>Reports & Analytics</h2>

    <div class="reports-grid">
      <div class="card">
        <h3>Inventory Report</h3>
        <p>Total items: {{ totalItems }}</p>
        <p>Low stock items: {{ lowStockItems }}</p>
        <p>Average stock: {{ avgStock.toFixed(1) }}</p>
      </div>

      <div class="card">
        <h3>Orders Report</h3>
        <p>Total orders: {{ totalOrders }}</p>
        <p>Recent orders (today): {{ recentOrders }}</p>
        <p>Total value: ₱{{ totalValue.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useItemsStore } from '../store/items.js'
import { useOrdersStore } from '../store/orders.js'

const itemsStore = useItemsStore()
const ordersStore = useOrdersStore()

const totalItems = ref(0)
const lowStockItems = ref(0)
const avgStock = ref(0)
const totalOrders = ref(0)
const recentOrders = ref(0)
const totalValue = ref(0)

onMounted(async () => {
  await itemsStore.fetch()
  await ordersStore.fetch()

  const items = itemsStore.items
  const orders = ordersStore.orders

  totalItems.value = items.length
  lowStockItems.value = items.filter(i => i.stock < 10).length
  avgStock.value = items.reduce((sum, i) => sum + i.stock, 0) / (totalItems.value || 1)

  totalOrders.value = orders.length
  recentOrders.value = orders.filter(o => {
    const created = new Date(o.created_at)
    return created.toDateString() === new Date().toDateString()
  }).length
  totalValue.value = orders.reduce((sum, o) => sum + (o.data?.total || 0), 0)
})
</script>

<style scoped>
/* Font family retained globally; removed redundant wrapper class */

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.reports-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card { /* inherits global .card utility; no local overrides */ }

.card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.card p {
  font-size: 14px;
  color: #374151;
  margin: 4px 0;
}
</style>
