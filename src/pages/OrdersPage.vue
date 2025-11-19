<template>
  <div>
    <h2>Orders Management</h2>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    <div v-else-if="orders.length === 0" class="card">
      <p style="color: #999; text-align: center;">No orders found.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Reference</th>
            <th>Total</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>#{{ order.id }}</td>
            <td>{{ order.reference || '-' }}</td>
            <td>${{ order.data?.total || 0 }}</td>
            <td>{{ formatDate(order.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useOrdersStore } from '../store/orders.js';
import '../css/pages/OrdersPage.css';

export default {
  name: 'OrdersPage',
  setup() {
    const store = useOrdersStore();
    const loading = ref(true);

    onMounted(async () => {
      try {
        await store.fetch();
      } finally {
        loading.value = false;
      }
    });

    function formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString();
    }

    return { orders: store.orders, loading, formatDate };
  }
};
</script>
