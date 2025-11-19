import { request } from './http.js';

export function listOrders() {
  return request('/orders');
}

export function getOrder(id) {
  return request(`/orders/${id}`);
}

export function createOrder(payload) {
  return request('/orders', { method: 'POST', body: payload });
}
