<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h2>Create Account</h2>
      </div>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <UiInput v-model="name" label="Full Name" :disabled="loading" />
      <UiInput v-model="email" label="Email" type="email" :disabled="loading" />
      <UiInput v-model="password" label="Password" type="password" :disabled="loading" />
      <UiInput v-model="confirmPassword" label="Confirm Password" type="password" :disabled="loading" />
      <button @click="doRegister" :disabled="loading" class="submit-btn">
        {{ loading ? 'Creating...' : 'Create Account' }}
      </button>
      <div class="register-footer">
        Already have an account? <router-link to="/login">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UiInput from '../components/ui/InputPage.vue';
import { useAuthStore } from '../store/auth.js';
import '../css/pages/RegisterPage.css';

export default {
  name: 'RegisterPage',
  components: { UiInput },
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const error = ref('');
    const loading = ref(false);

    async function doRegister() {
      error.value = '';

      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        error.value = 'All fields are required.';
        return;
      }

      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match.';
        return;
      }

      if (password.value.length < 6) {
        error.value = 'Password must be at least 6 characters.';
        return;
      }

      loading.value = true;
      try {
        await auth.register(name.value, email.value, password.value);
        router.push('/dashboard');
      } catch (err: any) {
        error.value = err.message || 'Registration failed. Please try again.';
      } finally {
        loading.value = false;
      }
    }

    return { name, email, password, confirmPassword, error, loading, doRegister };
  }
};
</script>
