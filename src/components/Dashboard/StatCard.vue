<template>
  <div class="card card-stat rounded-xl hover:shadow-md">
    <div>
      <div class="text-xs text-gray-400">{{ title }}</div>
      <div :class="valueClass">{{ value }}</div>
    </div>
    <div class="text-xs text-gray-400 mt-3">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  title: string
  value: string | number
  subtitle?: string
  color?: string
}>()

const valueClass = computed(() => {
  const base = 'font-extrabold mt-4'
  if (props.color) return `${base} ${props.color} text-4xl`
  return `${base} text-4xl`
})
</script>

<style scoped>
.card-stat { padding: 1.5rem; min-height: 110px; display: flex; flex-direction: column; justify-content: space-between; }
</style>
