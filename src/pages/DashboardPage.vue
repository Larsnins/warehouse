<template>
  <div class="dashboard-root">
    <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="space-y-4">

        <!-- Top toolbar -->
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold leading-tight">Dashboard</h1>
            <p class="text-sm text-gray-500">Warehouse Inventory Management — quick debug & actions</p>
          </div>
        </div>

      <!-- Stats: 4 columns (componentized) -->
      <StatGrid :stats="stats" />

      <!-- Main 2 Columns (componentized) -->
      <section class="grid grid-cols-1 md:grid-cols-2  mt-2">
        <RecentTransactions :recent="recentOrdersList" :loading="loading" :orderTotal="orderTotal" :formatCurrency="formatCurrency">
          <template #actions>
            <button @click="router.push('/orders')" class="text-sm text-blue-600">See all</button>
          </template>
        </RecentTransactions>

        <QuickActions
          @add="() => router.push('/items/add')"
          @print="handlePrintReport"
          @export="handleExportData"
          @view="() => router.push('/items')"
          @quickbuy="() => (showQuickBuy = true)"
        />
      </section>

      <!-- Quick Buy Modal -->
      <div v-if="showQuickBuy" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 class="font-semibold mb-3">Quick Buy</h3>
          <div class="space-y-3">

            <div>
              <label class="block text-xs text-gray-600">Item</label>
              <select v-model="qItemId" class="w-full border rounded px-2 py-1">
                <option :value="null">-- Select item --</option>
                <option v-for="it in itemsList" :key="it.id" :value="it.id">{{ it.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs text-gray-600">Size (optional)</label>
              <input v-model="qSize" class="w-full border rounded px-2 py-1" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-600">Price</label>
                <input type="number" v-model.number="qPrice" class="w-full border rounded px-2 py-1" />
              </div>
              <div>
                <label class="block text-xs text-gray-600">Quantity</label>
                <input type="number" v-model.number="qQuantity" class="w-full border rounded px-2 py-1" />
              </div>
            </div>

            <div class="flex justify-end gap-2">
              <button @click="showQuickBuy = false" class="px-3 py-2 bg-gray-200 rounded">Cancel</button>
              <button
                @click="handleQuickBuy"
                class="px-3 py-2 rounded text-white"
                :class="quickBuyValid ? 'bg-green-600' : 'bg-green-300 cursor-not-allowed'"
                :disabled="!quickBuyValid"
              >Purchase</button>
            </div>

          </div>
        </div>
      </div>

      <!-- Low Stock Table (componentized) -->
      <section class="grid grid-cols-1 md:grid-cols-2  mt-2">
        <LowStockTable :items="lowStockItems" :loading="loading" @reorder="handleReorder" />
      </section>

      <DebugDrawer
        :show="showDebugPanel"
        :debugJson="debugJson"
        :itemsCount="itemsCount"
        :ordersCount="pendingOrdersCount"
        @copy="copyDebug"
        @close="() => (showDebugPanel = false)"
      />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import StatGrid from '../components/Dashboard/StatGrid.vue'
import RecentTransactions from '../components/Dashboard/RecentTransactions.vue'
import QuickActions from '../components/Dashboard/QuickActions.vue'
import LowStockTable from '../components/Dashboard/LowStockTable.vue'
import { useItemsStore } from '../store/items.js'
import { useOrdersStore } from '../store/orders.js'

const router = useRouter()

const itemsStore = useItemsStore()
const ordersStore = useOrdersStore()

const itemsCount = computed<number>(() => itemsStore.items?.length || 0)
const lowStockItems = computed<any[]>(() => (itemsStore.items || []).filter((i: any) => Number(i.stock) < 20))
const lowStockCount = computed<number>(() => lowStockItems.value.length)
const totalInventoryValue = computed<number>(() =>
  (itemsStore.items || []).reduce((sum: number, it: any) => {
    const unit = Number(it.price ?? it.cost ?? 0)
    return sum + (Number(it.stock) * unit)
  }, 0)
)
const pendingOrdersCount = computed<number>(() => ordersStore.pendingOrders?.length || 0)

const recentOrdersList = computed<any[]>(() => (ordersStore.orders || []).slice().reverse().slice(0, 3))

const itemsList = computed<any[]>(() => itemsStore.items || [])

const stats = computed(() => [
  { title: 'Total Items', value: itemsCount.value, subtitle: 'Inventory overview' },
  { title: 'Low Stock', value: lowStockCount.value, subtitle: 'Items below threshold', color: 'text-amber-600' },
  { title: 'Total Value', value: formatCurrency(totalInventoryValue.value), subtitle: 'Inventory value', color: 'text-emerald-600' },
  { title: 'Pending Orders', value: pendingOrdersCount.value, subtitle: 'Awaiting fulfillment', color: 'text-sky-600' }
])

const showQuickBuy = ref(false)
const qItemId = ref(null)
const qSize = ref('')
const qPrice = ref(30)
const qQuantity = ref(1)
const loading = ref(true)
const showDebugPanel = ref(false)

function formatCurrency(val: number) {
  return '₱' + (isFinite(val) ? val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00')
}

const quickBuyValid = computed(() =>
  qItemId.value !== null &&
  Number(qQuantity.value) > 0 &&
  Number(qPrice.value) > 0
)

function orderTotal(order: any) {
  const t = order?.total ?? order?.data?.total
  if (t != null) return Number(t).toFixed(2)
  const p = Number(order?.price ?? order?.data?.price ?? 0)
  const q = Number(order?.quantity ?? order?.data?.quantity ?? 0)
  return (p * q).toFixed(2)
}

const debugJson = computed(() => {
  try {
    return JSON.stringify({ items: itemsStore.items || [], orders: ordersStore.orders || [] }, null, 2)
  } catch (e) {
    return String(e)
  }
})

async function refetchAll() {
  loading.value = true
  await Promise.all([itemsStore.fetch(), ordersStore.fetch()])
  loading.value = false
}

async function copyDebug() {
  try {
    await navigator.clipboard.writeText(debugJson.value)
    // small user feedback — keep it simple
    alert('Debug JSON copied to clipboard')
  } catch (e) {
    console.error(e)
    alert('Unable to copy')
  }
}

async function handleQuickBuy() {
  try {
    if (!qItemId.value) return alert('Select an item')

    const item = await itemsStore.fetchOne(qItemId.value)
    const qty = Number(qQuantity.value)
    const price = Number(qPrice.value)

    if (item.stock < qty) return alert('Not enough stock')

    await itemsStore.update(item.id, { stock: item.stock - qty })

    await ordersStore.create({
      data: {
        item_id: item.id,
        name: item.name,
        size: qSize.value || null,
        quantity: qty,
        price,
        total: qty * price,
        status: 'completed',
        purchased_at: new Date().toISOString()
      }
    })

    await itemsStore.fetch()
    await ordersStore.fetch()

    showQuickBuy.value = false
    qItemId.value = null
    qSize.value = ''
    qPrice.value = 30
    qQuantity.value = 1
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  await Promise.all([itemsStore.fetch(), ordersStore.fetch()])
  loading.value = false
})

function handleReorder(name: string) {
  router.push({ path: '/orders', query: { item: name } })
}

function handlePrintReport() {
  window.print()
}

function handleExportData() {
  alert('Exporting CSV...')
}
</script>

<style scoped>
/* Local dashboard styles (component-scoped) to avoid relying on global main.css */
.dashboard-root {
  min-height: 100vh;
  background: #ffffff;
  color: #1a202c;
}
.card {
  background: #ffffff;
  color: #1a202c;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  padding: 1rem; /* Balanced compact padding */
}
.card h3 { margin-top: 0; }
.dashboard-root .inline-block.bg-red-100 { background: #fee2e2; }

/* Force-remove larger gray section backgrounds inside dashboard */
.dashboard-root .bg-gray-50,
.dashboard-root .bg-gray-100 {
  background: transparent !important;
}

.dashboard-root > .max-w-7xl,
.dashboard-root .card { background: #ffffff; }

/* Uniform vertical rhythm for text inside cards */
.card .text-2xl { line-height: 1.1; }
.card .text-xs { line-height: 1.2; }

/* Remove any unintended gray band from direct child sections */
.dashboard-root section { background: transparent !important; }
.dashboard-root header { background: transparent; }

/* Small utility styles for this dashboard */
.card-stat { padding: 1.5rem; min-height: 110px; display: flex; flex-direction: column; justify-content: space-between; }
.skeleton { background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%); border-radius: 4px; background-size: 200% 100%; animation: shimmer 1.2s linear infinite; }
@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }

/* Debug drawer fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0 }

.card:hover { transform: translateY(-2px); transition: transform .15s ease; }

/* Table cell padding to match other cards' spacing */
.cell { padding: 1rem; }
</style>

