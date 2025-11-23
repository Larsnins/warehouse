import { defineStore } from 'pinia'
import { listItems, getItem, createItem, updateItem, deleteItem } from '../api/items.js'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] // plain JS, no type annotation
  }),
  actions: {
    async fetch() {
      this.items = await listItems()
    },
    async fetchOne(id) {
      return await getItem(id)
    },
    async create(payload) {
      const item = await createItem(payload)
      this.items.push(item)
      return item
    },
    async update(id, payload) {
      const updated = await updateItem(id, payload)
      this.items = this.items.map(i => i.id === id ? updated : i)
      return updated
    },
    async remove(id) {
      await deleteItem(id)
      this.items = this.items.filter(i => i.id !== id)
    }
  }
})
