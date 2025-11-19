


import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout, me as apiMe } from '../api/auth.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = ''
      try {
        const res = await apiLogin({ email, password })
        this.user = res.user
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        this.error = err.message || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },
    async logout() {
      await apiLogout()
      this.user = null
      localStorage.removeItem('user')
    },
    async fetchUser() {
      try {
        const res = await apiMe()
        this.user = res.user
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch {
        this.user = null
      }
    }
  }
})
