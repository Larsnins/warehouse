import { request } from './http.js';

export function salesReport(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/reports/sales?${qs}`);
}

export function inventoryReport() {
  return request('/reports/inventory');
}
