<template>
  <div class="grid">
    <aside class="card">
      <h3>Menu</h3>
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/items">Items</router-link></li>
        <li><router-link to="/orders">Orders</router-link></li>
        <li><router-link to="/reports">Reports</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </aside>
    <main>
      <div class="header card"><slot name="header" /></div>
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardLayout',
};
</script>

<style scoped>
aside { min-height: 400px; }
</style>
