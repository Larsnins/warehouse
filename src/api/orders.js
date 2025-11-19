import { defineStore } from 'pinia';
import * as OrdersApi from '../api/orders.js';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false,
    error: ''
  }),
  actions: {
    async fetch() {
      this.loading = true;
      try {
        const data = await OrdersApi.listOrders();
        this.orders = data || [];
      } catch (err) {
        this.error = err.message || 'Failed to fetch orders';
      } finally {
        this.loading = false;
      }
    },

    async create(payload) {
      this.loading = true;
      try {
        const newOrder = await OrdersApi.createOrder(payload);
        this.orders = [...this.orders, newOrder]; // reactive update
        return newOrder;
      } catch (err) {
        this.error = err.message || 'Failed to create order';
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});
