<template>
  <div class="card">
    <h3 class="font-semibold mb-3">Quick Actions</h3>
    <div class="flex flex-wrap gap-3">
      <button @click="$emit('add')" class="px-3 py-2 bg-red-600 text-white rounded-xl">+ Add Item</button>
      <button @click="$emit('print')" class="px-3 py-2 bg-sky-600 text-white rounded-xl">Print</button>
      <button @click="$emit('export')" class="px-3 py-2 bg-sky-600 text-white rounded-xl">Export</button>
      <button @click="$emit('view')" class="px-3 py-2 bg-slate-600 text-white rounded-xl">View Inventory</button>
      <button @click="$emit('quickbuy')" class="px-3 py-2 bg-emerald-600 text-white rounded-xl">Quick Buy</button>
    </div>
    <div class="mt-3 text-xs text-gray-500"><slot name="tip">Tip: use the Toggle Debug to view stores and quickly copy JSON.</slot></div>
  </div>
</template>

<script setup lang="ts">
// purely presentational, emits events handled by parent
</script>
