<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl gap-4 mt-4">
    <StatCard
      v-for="(s, i) in stats"
      :key="i"
      :title="s.title"
      :value="s.value"
      :subtitle="s.subtitle"
      :color="s.color"
    />
  </section>
</template>

<script setup lang="ts">
import StatCard from './StatCard.vue'
defineProps<{ stats: Array<Record<string, any>> }>()
</script>
