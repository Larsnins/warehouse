<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrdersStore } from '../store/orders.js'

// store comes from a JS module; give it an any type so template type checking won't fail
const store: any = useOrdersStore()

onMounted(async () => {
  try {
    await store.fetch() // fetch orders on page load
  } catch (err) {
    console.error('Failed fetching orders', err)
  }
})

// Helper to format a price value consistently
function formatPrice(val: any) {
  const n = Number(val ?? 0)
  if (isNaN(n)) return '0.00'
  return n.toFixed(2)
}
</script>

<template>
  <div class="orders-root page section-stack compact">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Orders</h2>
    </div>

    <div v-if="store.loading" class="py-8 text-center">
      <div class="mx-auto w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p class="mt-4 text-gray-600">Loading orders...</p>
    </div>

    <div v-else>
      <div v-if="store.error" class="text-red-600 mb-4">Error: {{ store.error }}</div>
      <div v-else-if="store.orders.length === 0" class="text-gray-600">No orders found.</div>

      <div v-else class="ui-card table-wrapper">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Quantity</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Price</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Created</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Total</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in store.orders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-4 py-3 text-sm text-gray-700">#{{ order.id }}</td>
              <td class="px-4 py-3 text-sm text-gray-900">{{ (order.data && (order.data.quantity ?? order.quantity)) ?? 0 }}</td>
              <td class="px-4 py-3 text-sm text-gray-700">₱{{ formatPrice(order.data?.price ?? (order.data?.total && order.data?.quantity ? order.data.total / order.data.quantity : 0)) }}</td>
              <td class="px-4 py-3 text-sm text-gray-500">{{ order.created_at }}</td>
              <td class="px-4 py-3 text-sm text-gray-700">₱{{ formatPrice(order.data?.total ?? 0) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Local Orders page styles to reduce dependency on global CSS */
.orders-root {
  background: #ffffff;
  color: #1a202c;
}
.orders-root .bg-white {
  background: #ffffff;
}
.orders-root table th, .orders-root table td {
  vertical-align: middle;
}
.orders-root .mx-auto.w-10.h-10 { border-top-color: #2563eb; }
</style>
