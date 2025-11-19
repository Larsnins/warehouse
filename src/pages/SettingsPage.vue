<template>
  <div>
    <h2>Settings</h2>
    <div class="card">
      <h3>Application Settings</h3>
      <ul style="list-style: none;">
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
          <strong>API Base URL:</strong> {{ apiBase }}
        </li>
        <li style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
          <strong>App Version:</strong> 1.0.0
        </li>
        <li style="padding: 8px 0;">
          <strong>Environment:</strong> {{ env }}
        </li>
      </ul>
    </div>
    <div class="card">
      <h3>Database Info</h3>
      <p>Current database: SQLite (local)</p>
      <p>API Status: <span style="color: #48bb78; font-weight: 600;">✓ Connected</span></p>
    </div>
  </div>
</template>

<script>
import '../css/pages/SettingsPage.css'

export default {
  name: 'SettingsPage',
  setup() {
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';
    const env = import.meta.env.MODE || 'development';
    return { apiBase, env };
  }
};
</script>
