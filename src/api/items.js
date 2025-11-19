import { request } from './http.js'

export function listItems() {
  return request('/items')
}

export function getItem(id) {
  return request(`/items/${id}`)
}

export function createItem(payload) {
  return request('/items', { method: 'POST', body: payload })
}

export function updateItem(id, payload) {
  return request(`/items/${id}`, { method: 'PUT', body: payload })
}

export function deleteItem(id) {
  return request(`/items/${id}`, { method: 'DELETE' })
}