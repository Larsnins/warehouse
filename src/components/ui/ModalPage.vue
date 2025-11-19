<template>
  <div v-if="show" class="modal">
    <div class="modal-inner card">
      <button class="close" @click="$emit('close')">✕</button>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiModal',
  props: { show: { type: Boolean, default: false } }
};
</script>

<style scoped>
.modal { position: fixed; inset: 0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.4); }
.modal-inner { position: relative; width: 90%; max-width: 640px; }
.close { position: absolute; right: 8px; top: 8px; background: transparent; border: none; font-size: 18px; cursor:pointer }
</style>
