<template>
  <button :class="['btn', variant]" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'UiButton',
  props: {
    variant: { type: String, default: 'primary' },
    disabled: Boolean
  },
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.primary {
  background: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
}

.muted {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.muted:hover:not(:disabled) {
  background: var(--border-color);
}
</style>
