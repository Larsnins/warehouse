<template>
  <div class="add-item-page">
    <h2>Add New Item</h2>
    <form @submit.prevent="save" class="card">
      <div class="form-group">
        <label>Item Name *</label>
        <input v-model="name" type="text" placeholder="e.g., Widget A" required />
      </div>

      <div class="form-group">
        <label>Initial Stock *</label>
        <input v-model.number="stock" type="number" min="0" placeholder="0" required />
      </div>

      <div class="form-actions">
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

<style scoped>
.add-item-page {
  padding: 24px;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.card {
  max-width: 500px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.btn-primary {
  background-color: #dc2626;
  color: white;
}

.btn-primary:hover {
  background-color: #b91c1c;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background-color: #4b5563;
}
</style>
