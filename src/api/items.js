import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // must match php artisan serve
})

export const listItems = () => api.get('/items').then(res => res.data)
export const getItem = (id) => api.get(`/items/${id}`).then(res => res.data)
export const createItem = (payload) => api.post('/items', payload).then(res => res.data)
export const updateItem = (id, payload) => api.put(`/items/${id}`, payload).then(res => res.data)
export const deleteItem = (id) => api.delete(`/items/${id}`).then(res => res.data)
