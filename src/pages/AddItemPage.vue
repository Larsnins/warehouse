<template>
  <div class="page" style="max-width:600px;">
    <h2 class="text-2xl font-bold mb-6">Add New Item</h2>

    <form @submit.prevent="save" class="ui-card space-y-4">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Item Name *</label>
        <input v-model="name" type="text" placeholder="e.g., Widget A" required class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-1">Initial Stock *</label>
        <input v-model.number="stock" type="number" min="0" placeholder="0" required class="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200" />
      </div>

      <div class="flex items-center gap-3">
        <button type="submit" class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
          <CheckIcon class="w-4 h-4" />
          Save Item
        </button>

        <router-link to="/items" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useItemsStore } from '../store/items.js'
import { useRouter } from 'vue-router'
import { CheckIcon } from '@heroicons/vue/24/outline'

const itemsStore = useItemsStore()
const router = useRouter()

const name = ref('')
const stock = ref(0)

const save = async () => {
  try {
    await itemsStore.create({ name: name.value, stock: stock.value })
    alert('Item created successfully!')
    router.push('/items')
  } catch (err: any) {
    alert('Error creating item: ' + (err?.message || String(err)))
  }
}
</script>

<style scoped>
/* Styling moved to Tailwind utility classes in template */
</style>
