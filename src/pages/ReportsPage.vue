<template>
  <div>
    <h2>Reports & Analytics</h2>
    <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 20px;">
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
        <p>Total value: ${{ totalValue.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useItemsStore } from '../store/items.js';
import { useOrdersStore } from '../store/orders.js';
import '../css/pages/ReportsPage.css';

export default {
  name: 'ReportsPage',
  setup() {
    const itemsStore = useItemsStore();
    const ordersStore = useOrdersStore();
    
    const totalItems = ref(0);
    const lowStockItems = ref(0);
    const avgStock = ref(0);
    const totalOrders = ref(0);
    const recentOrders = ref(0);
    const totalValue = ref(0);

    onMounted(async () => {
      await itemsStore.fetch();
      await ordersStore.fetch();

      totalItems.value = itemsStore.items.length;
      lowStockItems.value = itemsStore.items.filter(i => i.stock < 10).length;
      avgStock.value = itemsStore.items.reduce((sum, i) => sum + i.stock, 0) / (totalItems.value || 1);

      totalOrders.value = ordersStore.orders.length;
      recentOrders.value = ordersStore.orders.filter(o => {
        const created = new Date(o.created_at);
        return created.toDateString() === new Date().toDateString();
      }).length;
      totalValue.value = ordersStore.orders.reduce((sum, o) => sum + (o.data?.total || 0), 0);
    });

    return { totalItems, lowStockItems, avgStock, totalOrders, recentOrders, totalValue };
  }
};
</script>
