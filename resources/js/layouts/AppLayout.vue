<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';

// Define a type for each breadcrumb
interface BreadcrumbItem {
  title: string;
  href: string;
}

// Properly type props so TS knows the shape of breadcrumbs
defineProps<{
  breadcrumbs: BreadcrumbItem[];
}>();
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Head title="Warehouse App" />

    <!-- Navbar -->
    <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div class="font-bold text-lg">Warehouse</div>
      <ul class="flex space-x-4">
        <li><Link href="/" class="hover:underline">Home</Link></li>
        <li><Link href="/dashboard" class="hover:underline">Dashboard</Link></li>
      </ul>
    </nav>

    <!-- Breadcrumbs -->
    <div v-if="breadcrumbs.length" class="bg-white dark:bg-gray-700 p-3 text-sm">
      <template v-for="(crumb, index) in breadcrumbs" :key="index">
        <Link
          :href="crumb.href"
          class="hover:underline text-gray-700 dark:text-gray-200"
        >
          {{ crumb.title }}
        </Link>
        <span v-if="index < breadcrumbs.length - 1">/</span>
      </template>
    </div>

    <!-- Page content -->
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
