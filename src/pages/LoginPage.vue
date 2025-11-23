<template>
  <div class="login-wrapper">
    <!-- LEFT PANEL -->
    <div class="login-left">
      <CubeIcon class="logo-img text-red-600" aria-hidden="true" />
      <h1 class="system-title text-red-600">XYM COOPERATION</h1>
      <p class="system-subtitle text-white">Inventory System</p>
    </div>

    <!-- RIGHT LOGIN FORM -->
    <div class="login-right">
      <div class="login-card ring-1">
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
import CubeIcon from '../components/icons/CubeIcon.vue'
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
    // Try session-based POST to /login (Fortify/web route). Use credentials to include cookies.
    // Laravel expects a form POST and a CSRF token header. Use urlencoded body and include XSRF token.
    function getCookie(name: string) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? decodeURIComponent(match[2]) : null
    }

    const xsrf = getCookie('XSRF-TOKEN')
    const form = new URLSearchParams()
    form.append('email', email.value)
    form.append('password', password.value)

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(xsrf ? { 'X-XSRF-TOKEN': xsrf } : {})
      },
      credentials: 'include',
      body: form.toString()
    })

    const text = await res.text()
    let data: any = null
    try { data = text ? JSON.parse(text) : null } catch { data = text }

    if (res.ok) {
      // populate user in store if endpoint supports it
      try {
        await auth.fetchUser()
      } catch {}
      // redirect to dashboard/home
      window.location.href = '/dashboard'
      return
    }

    // handle validation / error responses
    if (res.status === 422 && data && typeof data === 'object') {
      error.value = data.message || 'Validation failed'
    } else if (data && typeof data === 'object' && data.message) {
      error.value = data.message
    } else {
      error.value = 'Login failed'
    }
  } catch (err: unknown) {
    if (err instanceof Error) error.value = err.message
    else error.value = 'Login failed'
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
  background-color: rgb(0, 0, 0);
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
}

.system-subtitle {
  font-size: 18px;
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
  border-color: ;
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
