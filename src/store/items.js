import { defineStore } from 'pinia'
import { listItems, createItem, updateItem, deleteItem } from '../api/items.js'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [], // array of items
    loading: false
  }),
  actions: {
    async fetch() {
      this.loading = true
      try {
        const data = await listItems()
        this.items = Array.isArray(data) ? data : []
      } finally {
        this.loading = false
      }
    },
    async add(payload) {
      const newItem = await createItem(payload)
      // ensure items is array
      if (!Array.isArray(this.items)) this.items = []
      this.items.push(newItem)
      return newItem
    },
    async updateItem(id, payload) {
      const updated = await updateItem(id, payload)
      const index = this.items.findIndex(i => i.id === id)
      if (index !== -1) this.items[index] = updated
      return updated
    },
    async remove(id) {
      await deleteItem(id)
      this.items = this.items.filter(i => i.id !== id)
    }
  }
})
