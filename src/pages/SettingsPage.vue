<template>
  <div class="page section-stack compact">
    <h2 class="text-2xl font-bold mb-5">Settings</h2>

    <div class="ui-card">
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

    <div class="ui-card">
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
.settings-list { list-style: none; padding: 0; margin: 0; }
.settings-list li { padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
.settings-list li:last-child { border-bottom: none; }
.status-connected { color: #48bb78; font-weight: 600; }
</style>
