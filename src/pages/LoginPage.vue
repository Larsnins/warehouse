<template>
  <div class="login-wrapper">
    <!-- LEFT PANEL -->
    <div class="login-left">
      <img src="/images/logo.png" alt="Logo" class="logo-img" />
      <h1 class="system-title">XYM COOPERATION</h1>
      <p class="system-subtitle">Inventory System</p>
    </div>

    <!-- RIGHT LOGIN FORM -->
    <div class="login-right">
      <div class="login-card">
        <h2 class="login-header-title">Login</h2>

        <div v-if="error" class="error-message">{{ error }}</div>

        <UiInput v-model="email" label="Email" type="email" :disabled="loading" />
        <UiInput v-model="password" label="Password" type="password" :disabled="loading" />

        <button @click="doLogin" :disabled="loading" class="login-button">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="login-footer">
          Don't have an account?
          <router-link to="/register" class="link">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiInput from '../components/ui/InputPage.vue'
import { useAuthStore } from '../store/auth.js'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const doLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Login failed.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
}

/* LEFT PANEL */
.login-left {
  width: 45%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e5e7eb;
}

.logo-img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 20px;
}

.system-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.system-subtitle {
  font-size: 18px;
  color: #4b5563;
  margin-top: 5px;
}

/* RIGHT LOGIN FORM */
.login-right {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 350px;
  padding: 25px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.login-header-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

.error-message {
  color: red;
  margin-bottom: 15px;
  text-align: center;
}

.login-button {
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
}

.login-button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
}

.login-footer .link {
  color: #2563eb;
  text-decoration: none;
}

.login-footer .link:hover {
  text-decoration: underline;
}
</style>
