<template>
  <div class="card">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold mb-3">Recent Transactions</h3>
      <slot name="actions"></slot>
    </div>

    <div class="space-y-2">
      <template v-if="loading">
        <ul class="space-y-2">
          <li class="flex items-center justify-between">
            <div class="w-2/3">
              <div class="skeleton h-4 w-40 mb-1"></div>
              <div class="skeleton h-3 w-28"></div>
            </div>
            <div class="w-1/3 text-right">
              <div class="skeleton h-4 w-20 ml-auto"></div>
              <div class="skeleton h-3 w-16 ml-auto mt-2"></div>
            </div>
          </li>
        </ul>
      </template>

      <template v-else>
        <template v-if="recent.length">
          <ul class="space-y-3">
            <li v-for="order in recent" :key="order.id" class="flex justify-between items-center">
              <div>
                <div class="font-medium">{{ (order.data && order.data.name) || order.name }}</div>
                <div class="text-xs text-gray-400">{{ new Date((order.data && order.data.purchased_at) || order.purchased_at || order.created_at).toLocaleString() }}</div>
              </div>
              <div class="text-right">
                <div class="font-medium text-gray-800">{{ order.data?.quantity ?? order.quantity ?? 0 }}</div>
                <div class="text-xs text-gray-500">{{ formatCurrency(Number(orderTotal(order))) }}</div>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="text-sm text-gray-400">No recent transactions</div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  recent: any[]
  loading: boolean
  orderTotal: (o: any) => any
  formatCurrency: (v: number) => string
}>()
</script>
