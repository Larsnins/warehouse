import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { request } from '../api/http.js'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)

  const totalOrders = computed(() => orders.value.length)
  const pendingOrders = computed(() => orders.value.filter(order => order.status === 'pending'))
  const totalOrderValue = computed(() =>
    orders.value.reduce((sum, order) => sum + order.total, 0)
  )

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const data = await request('/orders')
      orders.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    try {
      const data = await request('/orders', { method: 'POST', body: payload })
      orders.value.push(data)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function update(id, payload) {
    try {
      const data = await request(`/orders/${id}`, { method: 'PUT', body: payload })
      const index = orders.value.findIndex(order => order.id === id)
      if (index !== -1) orders.value[index] = data
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function remove(id) {
    try {
      await request(`/orders/${id}`, { method: 'DELETE' })
      orders.value = orders.value.filter(order => order.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    orders,
    loading,
    error,
    totalOrders,
    pendingOrders,
    totalOrderValue,
    fetch,
    create,
    update,
    remove
  }
})
