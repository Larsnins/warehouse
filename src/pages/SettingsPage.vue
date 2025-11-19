<template>
  <div class="settings-page">
    <h2>Settings</h2>

    <div class="card">
      <h3>Application Settings</h3>
      <ul class="settings-list">
        <li>
          <strong>API Base URL:</strong> {{ apiBase }}
        </li>
        <li>
          <strong>App Version:</strong> 1.0.0
        </li>
        <li>
          <strong>Environment:</strong> {{ env }}
        </li>
      </ul>
    </div>

    <div class="card">
      <h3>Database Info</h3>
      <p>Current database: MySQL (local)</p>
      <p>
        API Status:
        <span class="status-connected">✓ Connected</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'
const env = import.meta.env.MODE || 'development'
</script>

<style scoped>
.settings-page {
  padding: 24px;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.settings-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.settings-list li {
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.settings-list li:last-child {
  border-bottom: none;
}

.status-connected {
  color: #48bb78;
  font-weight: 600;
}
</style>
