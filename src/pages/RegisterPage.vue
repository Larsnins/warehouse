<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <UiInput v-model="name" label="Full Name" :disabled="loading" />
      <UiInput v-model="email" label="Email" type="email" :disabled="loading" />
      <UiInput v-model="password" label="Password" type="password" :disabled="loading" />
      <UiInput v-model="confirmPassword" label="Confirm Password" type="password" :disabled="loading" />

      <button
        @click="doRegister"
        :disabled="loading"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4"
      >
        {{ loading ? 'Creating...' : 'Create Account' }}
      </button>

      <p class="mt-4 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UiInput from '../components/ui/InputPage.vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const doRegister = async () => {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'All fields are required.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  loading.value = true

  try {
    // Call your auth store register method
    await auth.register(name.value, email.value, password.value)

    // After successful registration, redirect to login page
    router.push('/login')
  } catch (err: any) {
    error.value = err.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* optional: you can remove if you use Tailwind for all styling */
</style>
