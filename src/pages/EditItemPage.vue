<template>
  <div>
    <h2>Edit Item #{{ id }}</h2>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    <form v-else @submit.prevent="save" class="card" style="max-width: 500px;">
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500;">Item Name *</label>
        <input v-model="name" type="text" required />
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500;">Stock *</label>
        <input v-model.number="stock" type="number" min="0" required />
      </div>
      <div style="display: flex; gap: 8px;">
        <button type="submit" class="btn btn-primary">Update Item</button>
        <router-link to="/items" class="btn btn-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useItemsStore } from '../store/items.js';
import { useRouter, useRoute } from 'vue-router';
import '../css/pages/EditItemPage.css';

const itemsStore = useItemsStore();
const router = useRouter();
const route = useRoute();

const id = route.params.id as string;
const name = ref('');
const stock = ref(0);
const loading = ref(true);

onMounted(async () => {
  try {
    const item = await itemsStore.fetchOne(id);
    if (item) {
      name.value = item.name || '';
      stock.value = item.stock || 0;
    }
  } catch (err: any) {
    alert('Error loading item: ' + err.message);
  } finally {
    loading.value = false;
  }
});

const save = async () => {
  try {
    await itemsStore.update(id, { name: name.value, stock: stock.value });
    alert('Item updated successfully!');
    router.push('/items');
  } catch (err: any) {
    alert('Error updating item: ' + err.message);
  }
};
</script>
