<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Login</h2>
        <p>Warehouse Inventory System</p>
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <UiInput v-model="email" label="Email" type="email" :disabled="loading" />
      <UiInput v-model="password" label="Password" type="password" :disabled="loading" />
      <button class="login-button" @click="doLogin" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>
      <p class="login-footer">
        Don't have an account? <router-link to="/register">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import UiInput from '../components/ui/InputPage.vue';
import { useAuthStore } from '../store/auth.js';
import '../css/pages/LoginPage.css';

export default {
  name: 'LoginPage',
  components: { UiInput },
  setup() {
    const auth = useAuthStore();
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const loading = ref(false);

    async function doLogin() {
      error.value = '';
      loading.value = true;
      try {
        await auth.login(email.value, password.value);
      } catch (err: any) {
        error.value = err.message || 'Login failed. Please try again.';
      } finally {
        loading.value = false;
      }
    }

    return { email, password, error, loading, doLogin };
  }
};
</script>
