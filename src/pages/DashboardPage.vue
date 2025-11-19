<template>
  <div class="dashboard-main">
    <div class="dashboard-header">
      <h2>Dashboard</h2>
      <p>Warehouse Inventory Management - Philippines</p>
    </div>

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
            <p class="stat-value" style="color: #f59e0b;">45</p>
            <p class="stat-subtitle">Items below minimum</p>
          </div>
          <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1);">⚠️</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div>
            <p class="stat-label">Total Value</p>
            <p class="stat-value" style="color: var(--color-success);">₱2.5M</p>
            <p class="stat-subtitle">Inventory value</p>
          </div>
          <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1);">💰</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div>
            <p class="stat-label">Pending Orders</p>
            <p class="stat-value" style="color: #3b82f6;">12</p>
            <p class="stat-subtitle">Awaiting fulfillment</p>
          </div>
          <div class="stat-icon" style="background: rgba(59, 130, 246, 0.1);">📋</div>
        </div>
      </div>
    </div>

    <div class="dashboard-two-column">
      <div class="card">
        <h3>Recent Transactions</h3>
        <div class="transaction-item">
          <div>
            <p class="transaction-name">Laptop - Stock In</p>
            <p class="transaction-time">2 hours ago</p>
          </div>
          <p class="transaction-qty" style="color: var(--color-success);">+50 units</p>
        </div>
        <div class="transaction-item">
          <div>
            <p class="transaction-name">Mouse - Sale</p>
            <p class="transaction-time">5 hours ago</p>
          </div>
          <p class="transaction-qty" style="color: var(--color-primary);">-120 units</p>
        </div>
        <div class="transaction-item">
          <div>
            <p class="transaction-name">Keyboard - Adjustment</p>
            <p class="transaction-time">1 day ago</p>
          </div>
          <p class="transaction-qty" style="color: #f59e0b;">-8 units</p>
        </div>
      </div>

      <div class="card">
        <h3>Quick Actions</h3>
        <div class="actions-list">
          <router-link to="/items/add" class="action-btn">
            + Add New Item
          </router-link>
          <button @click="handlePrintReport" class="action-btn action-btn-secondary">
            📄 Print Report
          </button>
          <button @click="handleExportData" class="action-btn action-btn-secondary">
            📊 Export Data
          </button>
          <router-link to="/items" class="action-btn action-btn-secondary">
            📦 View Inventory
          </router-link>
        </div>
      </div>
    </div>

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
import '../css/pages/DashboardPage.css'

function handlePrintReport() {
  window.print()
}

function handleExportData() {
  alert('Exporting data as CSV...')
}
</script>
