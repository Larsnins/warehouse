import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { request } from '../api/http.js'

export const useItemsStore = defineStore('items', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  const totalItems = computed(() => items.value.length)
  const lowStockItems = computed(() => items.value.filter(item => item.stock < 20))
  const totalInventoryValue = computed(() => 
    items.value.reduce((sum, item) => sum + (item.price * item.stock), 0)
  )

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const data = await request('/items')
      items.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    try {
      const data = await request('/items', { method: 'POST', body: payload })
      items.value.push(data)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function update(id, payload) {
    try {
      const data = await request(`/items/${id}`, { method: 'PUT', body: payload })
      const index = items.value.findIndex(item => item.id === id)
      if (index !== -1) items.value[index] = data
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function remove(id) {
    try {
      await request(`/items/${id}`, { method: 'DELETE' })
      items.value = items.value.filter(item => item.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function fetchOne(id) {
    try {
      const data = await request(`/items/${id}`)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    items,
    loading,
    error,
    totalItems,
    lowStockItems,
    totalInventoryValue,
    fetch,
    create,
    update,
    remove,
    fetchOne
  }
})
