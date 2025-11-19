<template>
  <div class="dashboard-main">
    <!-- Header -->
    <div class="dashboard-header">
      <h2>Dashboard</h2>
      <p>Warehouse Inventory Management - Philippines</p>
    </div>

    <!-- Stats Grid -->
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-content">
          <div>
            <p class="stat-label">Total Items</p>
            <p class="stat-value">1,247</p>
            <p class="stat-subtitle">+5 this week</p>
          </div>
          <div class="stat-icon">📦</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div>
            <p class="stat-label">Low Stock</p>
            <p class="stat-value warning">45</p>
            <p class="stat-subtitle">Items below minimum</p>
          </div>
          <div class="stat-icon warning-bg">⚠️</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div>
            <p class="stat-label">Total Value</p>
            <p class="stat-value success">₱2.5M</p>
            <p class="stat-subtitle">Inventory value</p>
          </div>
          <div class="stat-icon success-bg">💰</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div>
            <p class="stat-label">Pending Orders</p>
            <p class="stat-value primary">12</p>
            <p class="stat-subtitle">Awaiting fulfillment</p>
          </div>
          <div class="stat-icon primary-bg">📋</div>
        </div>
      </div>
    </div>

    <!-- Two Column Section -->
    <div class="dashboard-two-column">
      <!-- Recent Transactions -->
      <div class="card">
        <h3>Recent Transactions</h3>
        <div class="transaction-item">
          <div>
            <p class="transaction-name">Laptop - Stock In</p>
            <p class="transaction-time">2 hours ago</p>
          </div>
          <p class="transaction-qty success">+50 units</p>
        </div>
        <div class="transaction-item">
          <div>
            <p class="transaction-name">Mouse - Sale</p>
            <p class="transaction-time">5 hours ago</p>
          </div>
          <p class="transaction-qty primary">-120 units</p>
        </div>
        <div class="transaction-item">
          <div>
            <p class="transaction-name">Keyboard - Adjustment</p>
            <p class="transaction-time">1 day ago</p>
          </div>
          <p class="transaction-qty warning">-8 units</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <h3>Quick Actions</h3>
        <div class="actions-list">
          <router-link to="/items/add" class="action-btn">+ Add New Item</router-link>
          <button @click="handlePrintReport" class="action-btn secondary">📄 Print Report</button>
          <button @click="handleExportData" class="action-btn secondary">📊 Export Data</button>
          <router-link to="/items" class="action-btn secondary">📦 View Inventory</router-link>
        </div>
      </div>
    </div>

    <!-- Low Stock Table -->
    <div class="card">
      <h3>Low Stock Items</h3>
      <table class="dashboard-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Current Stock</th>
            <th>Min Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USB Cable</td>
            <td><span class="stock-badge">8</span></td>
            <td>20</td>
            <td><button class="reorder-btn">Reorder</button></td>
          </tr>
          <tr>
            <td>HDMI Cable</td>
            <td><span class="stock-badge">15</span></td>
            <td>30</td>
            <td><button class="reorder-btn">Reorder</button></td>
          </tr>
          <tr>
            <td>Power Adapter</td>
            <td><span class="stock-badge">5</span></td>
            <td>25</td>
            <td><button class="reorder-btn">Reorder</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
function handlePrintReport() {
  window.print()
}

function handleExportData() {
  alert('Exporting data as CSV...')
}
</script>

<style scoped>
.dashboard-main {
  padding: 24px;
  font-family: Arial, sans-serif;
}

.dashboard-header h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px;
}

.dashboard-header p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label { font-size: 12px; color: #6b7280; font-weight: 500; }
.stat-value { font-size: 20px; font-weight: 700; color: #1a202c; }
.stat-value.warning { color: #f59e0b; }
.stat-value.success { color: #10b981; }
.stat-value.primary { color: #3b82f6; }

.stat-subtitle { font-size: 12px; color: #9ca3af; }

.stat-icon {
  font-size: 28px;
  padding: 12px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-icon.warning-bg { background: rgba(245, 158, 11, 0.1); }
.stat-icon.success-bg { background: rgba(16, 185, 129, 0.1); }
.stat-icon.primary-bg { background: rgba(59, 130, 246, 0.1); }

.dashboard-two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}
.transaction-item:last-child { border-bottom: none; }
.transaction-name { font-weight: 600; }
.transaction-time { font-size: 12px; color: #6b7280; }
.transaction-qty.success { color: #10b981; }
.transaction-qty.warning { color: #f59e0b; }
.transaction-qty.primary { color: #3b82f6; }

.actions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #dc2626;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.action-btn.secondary {
  background-color: #3b82f6;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.dashboard-table th, .dashboard-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.stock-badge {
  background: #fee2e2;
  color: #dc2626;
  padding: 4px 8px;
  border-radius: 4px;
}

.reorder-btn {
  background: #2563eb;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
