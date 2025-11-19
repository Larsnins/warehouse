import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../../pages/LoginPage.vue'
import RegisterPage from '../../pages/RegisterPage.vue'
import DashboardPage from '../../pages/DashboardPage.vue'
import ItemsPage from '../../pages/ItemsPage.vue'
import AddItemPage from '../../pages/AddItemPage.vue'
import EditItemPage from '../../pages/EditItemPage.vue'
import OrdersPage from '../../pages/OrdersPage.vue'
import ReportsPage from '../../pages/ReportsPage.vue'
import SettingsPage from '../../pages/SettingsPage.vue'

const routes = [
  { path: '/', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/dashboard', name: 'dashboard', component: DashboardPage },
  { path: '/items', name: 'items', component: ItemsPage },
  { path: '/items/add', name: 'items.add', component: AddItemPage },
  { path: '/items/:id/edit', name: 'items.edit', component: EditItemPage, props: true },
  { path: '/orders', name: 'orders', component: OrdersPage },
  { path: '/reports', name: 'reports', component: ReportsPage },
  { path: '/settings', name: 'settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
