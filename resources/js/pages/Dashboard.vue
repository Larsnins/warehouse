<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import PlaceholderPattern from '@/components/PlaceholderPattern.vue';

const breadcrumbs = [{ title: 'Dashboard', href: '/dashboard' }];
</script>

<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="text-center mt-20">
      <h1 class="text-2xl font-bold text-green-600 mb-4">Dashboard Page</h1>
      <PlaceholderPattern class="mx-auto mt-10" />
    </div>
  </AppLayout>
</template>
