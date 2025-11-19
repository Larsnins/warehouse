<template>
  <div>
    <h2>Add New Item</h2>
    <form @submit.prevent="save" class="card" style="max-width: 500px;">
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500;">Item Name *</label>
        <input v-model="name" type="text" placeholder="e.g., Widget A" required />
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 6px; font-weight: 500;">Initial Stock *</label>
        <input v-model.number="stock" type="number" min="0" placeholder="0" required />
      </div>
      <div style="display: flex; gap: 8px;">
        <button type="submit" class="btn btn-primary">Save Item</button>
        <router-link to="/items" class="btn btn-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useItemsStore } from '../store/items.js';
import { useRouter } from 'vue-router';
import '../css/pages/AddItemPage.css';

const itemsStore = useItemsStore();
const router = useRouter();
const name = ref('');
const stock = ref(0);

const save = async () => {
  try {
    await itemsStore.create({ name: name.value, stock: stock.value });
    alert('Item created successfully!');
    router.push('/items');
  } catch (err: any) {
    alert('Error creating item: ' + err.message);
  }
};
</script>
