<script setup>
import { onMounted } from 'vue';
import { useOrdersStore } from '../store/orders.js';

const store = useOrdersStore();

onMounted(async () => {
  await store.fetch(); // fetch orders on page load
});
</script>

<template>
  <div>
    <h2>Orders</h2>

    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.orders.length === 0">No orders found.</div>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Reference</th>
          <th>Total</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in store.orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.reference || '-' }}</td>
          <td>{{ order.data?.total || 0 }}</td>
          <td>{{ order.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
