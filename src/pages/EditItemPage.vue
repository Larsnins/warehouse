<template>
  <div class="edit-wrapper">
    <h2>Edit Item #{{ id }}</h2>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading item...</p>
    </div>

    <!-- Edit Form -->
    <form v-else @submit.prevent="save" class="card">
      <div class="form-group">
        <label>Item Name *</label>
        <input v-model="name" type="text" required />
      </div>

      <div class="form-group">
        <label>Stock *</label>
        <input v-model.number="stock" type="number" min="0" required />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Update Item</button>
        <router-link to="/items" class="btn btn-secondary">Cancel</router-link>
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
.edit-wrapper {
  padding: 24px;
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1a202c;
}

/* Loading */
.loading {
  text-align: center;
  padding: 40px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #fee2e2;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Form */
.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: white;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background-color: #dc2626;
}

.btn-secondary {
  background-color: #2563eb;
}
</style>
