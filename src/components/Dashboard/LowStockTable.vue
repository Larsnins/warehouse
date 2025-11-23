<template>
    <div class="card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-semibold">Low Stock Items</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="cell text-left text-xs font-medium text-gray-500">Item</th>
            <th class="cell text-left text-xs font-medium text-gray-500">Stock</th>
            <th class="cell text-left text-xs font-medium text-gray-500">Min Level</th>
            <th class="cell text-left text-xs font-medium text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="loading">
            <tr>
              <td class="cell" colspan="4"><div class="skeleton h-6 w-full"></div></td>
            </tr>
          </template>
          <template v-else-if="items.length">
            <tr v-for="it in items" :key="it.id">
              <td class="cell">{{ it.name }}</td>
              <td class="cell"><span class="inline-block bg-red-100 text-red-600 px-2 py-1 rounded">{{ it.stock }}</span></td>
              <td class="cell">{{ it.min_level ?? 20 }}</td>
              <td class="cell"><button class="px-2 py-1 bg-blue-600 text-white rounded" @click="$emit('reorder', it.name)">Reorder</button></td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="cell text-gray-500" colspan="4">No low stock items</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: any[]; loading: boolean }>()
</script>
