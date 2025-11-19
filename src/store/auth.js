import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { request } from '../api/http.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const data = await request('/login', {
        method: 'POST',
        body: { email, password }
      })
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(name, email, password) {
    loading.value = true
    error.value = null
    try {
      const data = await request('/register', {
        method: 'POST',
        body: { name, email, password }
      })
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await request('/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  async function fetchUser() {
    if (!token.value) return
    loading.value = true
    error.value = null
    try {
      const data = await request('/user')
      user.value = data
    } catch (err) {
      error.value = err.message
      token.value = null
      localStorage.removeItem('token')
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser
  }
})
