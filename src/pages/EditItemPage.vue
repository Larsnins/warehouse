<template>
  <div class="page" style="max-width:600px;">
    <h2 class="text-2xl font-bold mb-6">Edit Item #{{ id }}</h2>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading item...</p>
    </div>

    <!-- Edit Form -->
    <form v-else @submit.prevent="save" class="ui-card space-y-4">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Item Name *</label>
          <input v-model="name" type="text" required class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Stock *</label>
          <input v-model.number="stock" type="number" min="0" required class="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">Update Item</button>
        <router-link to="/items" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useItemsStore } from '../store/items.js'
import { useRouter, useRoute } from 'vue-router'

const itemsStore = useItemsStore()
const router = useRouter()
const route = useRoute()

const id = route.params.id as string
const name = ref('')
const stock = ref(0)
const loading = ref(true)

onMounted(async () => {
  try {
    const item = await itemsStore.fetchOne(id)
    if (item) {
      name.value = item.name ?? ''
      stock.value = item.stock ?? 0
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert('Error loading item: ' + err.message)
    } else {
      alert('Error loading item.')
    }
  } finally {
    loading.value = false
  }
})

const save = async () => {
  try {
    await itemsStore.update(id, { name: name.value, stock: stock.value })
    alert('Item updated successfully!')
    router.push('/items')
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert('Error updating item: ' + err.message)
    } else {
      alert('Error updating item.')
    }
  }
}
</script>

<style scoped>
/* Spinner retained */
.loading { text-align: center; padding: 40px 0; }
.spinner { width: 40px; height: 40px; border: 4px solid #fee2e2; border-top: 4px solid #dc2626; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
