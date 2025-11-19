<template>
  <AppLayout :breadcrumbs="breadcrumbs">
    <h1 class="text-center mt-20 text-4xl font-bold text-blue-600">
      Welcome to Warehouse
    </h1>
    <p v-if="canRegister" class="text-center mt-2 text-lg">
      Registration is open!
    </p>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';

defineProps({
  canRegister: Boolean,
});

const breadcrumbs = [{ title: 'Home', href: '/' }];
</script>
