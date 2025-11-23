<template>
  <div class="app">
    <!-- Header - Show only when NOT on login/register page -->
    <header v-if="route.name !== 'login' && route.name !== 'register'" class="header">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <CubeIcon style="width: 24px; height: 24px; color: white;" />
          <div>
            <h1 style="margin: 0; font-weight: 700;">XYM COOPERATION</h1>
            <p class="subtitle" style="margin: 2px 0 0 0;">Online Inventory System</p>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <!-- Theme toggle -->
          <button
            class="theme-toggle"
            :aria-pressed="isDark"
            @click="toggleTheme"
            title="Toggle dark mode"
            style="font-size: 14px;"
          >
            <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Grid - Show only when NOT on login/register page -->
    <div v-if="route.name !== 'login' && route.name !== 'register'" class="grid">
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <h3>MENU</h3>
        <ul>
          <li>
            <router-link
              to="/dashboard"
              :class="{ active: route.name === 'dashboard' }"
              class="nav-link"
            >
              <PresentationChartBarIcon style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;" />
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/items"
              :class="{ active: route.name === 'items' }"
              class="nav-link"
            >
              <CubeIcon style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;" />
              Inventory
            </router-link>
          </li>
          <li>
            <router-link
              to="/orders"
              :class="{ active: route.name === 'orders' }"
              class="nav-link"
            >
              <ShoppingCartIcon style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;" />
              Orders
            </router-link>
          </li>
          <li>
            <router-link
              to="/reports"
              :class="{ active: route.name === 'reports' }"
              class="nav-link"
            >
              <ChartBarIcon style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;" />
              Reports
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings"
              :class="{ active: route.name === 'settings' }"
              class="nav-link"
            >
              <Cog6ToothIcon style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;" />
              Settings
            </router-link>
          </li>
          <li class="logout-section">
            <router-link to="/" class="nav-link logout-link">
              <ArrowRightOnRectangleIcon style="width: 20px; height: 20px; margin-right: 8px; display: inline-block; vertical-align: middle;" />
              Logout
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="main">
        <router-view />
      </main>
    </div>

    <!-- Login/Register Page - router-view handles full layout -->
    <div v-if="route.name === 'login' || route.name === 'register'" style="flex: 1;">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CubeIcon from './components/icons/CubeIcon.vue';
import PresentationChartBarIcon from './components/icons/PresentationChartBarIcon.vue';
import ShoppingCartIcon from './components/icons/ShoppingCartIcon.vue';
import ChartBarIcon from './components/icons/ChartBarIcon.vue';
import Cog6ToothIcon from './components/icons/Cog6ToothIcon.vue';
import ArrowRightOnRectangleIcon from './components/icons/ArrowRightOnRectangleIcon.vue';

export default defineComponent({
  name: 'App',
  components: {
    CubeIcon,
    PresentationChartBarIcon,
    ShoppingCartIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
  },
  setup() {
    const route = useRoute();

    const isDark = ref<boolean>(false);

    const applyTheme = (dark: boolean) => {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const toggleTheme = () => {
      isDark.value = !isDark.value;
    };

    onMounted(() => {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        isDark.value = true;
      } else if (saved === 'light') {
        isDark.value = false;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true;
      }
      applyTheme(isDark.value);
    });

    watch(isDark, (val) => {
      applyTheme(val);
      try {
        localStorage.setItem('theme', val ? 'dark' : 'light');
      } catch {
        // ignore write errors (private mode, etc.)
      }
    });

    return { route, isDark, toggleTheme };
  },
});
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  color: var(--card-text);
}

.header {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  padding: 12px 0;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
  border-bottom: 2px solid #7f1d1d;
}

.header h1 {
  font-size: 20px;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  margin: 2px 0 0 0;
  font-size: 11px;
  opacity: 0.85;
  font-weight: 400;
}

.grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  padding: 16px;
  flex: 1;
}

.sidebar h3 {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--text-primary);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.nav-link {
  font-weight: 500;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 6px;
  display: block;
  text-decoration: none;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.nav-link:hover {
  background-color: var(--bg-secondary);
  border-left-color: var(--color-primary);
  transform: translateX(2px);
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--bg-secondary);
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: 600;
}

.logout-section {
  margin-top: 12px;
  border-top: 1px solid var(--border-color);
  padding-top: 8px;
}

.logout-link {
  color: var(--color-primary) !important;
  font-weight: 600;
}

.logout-link:hover {
  background-color: rgba(220, 38, 38, 0.1);
  border-left-color: var(--color-primary);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 18px;
  }

  .grid {
    grid-template-columns: 180px 1fr;
    gap: 12px;
    padding: 12px;
  }
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.sidebar {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  height: fit-content;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 4px;
}

.main {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
}
</style>
