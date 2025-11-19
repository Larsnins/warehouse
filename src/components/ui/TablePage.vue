<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="h in headers" :key="h">{{ h }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td v-for="(v, i) in rowValues(row)" :key="i">{{ v }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UiTable',
  props: { headers: { type: Array, default: () => [] }, rows: { type: Array, default: () => [] } },
  methods: {
    rowValues(row) { return Object.values(row); }
  }
};
</script>

<style scoped>
.table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; }
</style>
