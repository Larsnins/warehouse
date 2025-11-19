<template>
  <div class="input">
    <label v-if="label">{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue" 
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UiInput',
  props: { 
    modelValue: [String, Number], 
    label: String, 
    type: { type: String, default: 'text' },
    disabled: Boolean
  },
};
</script>

<style scoped>
.input {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}

input {
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  color: var(--text-primary);
  background: var(--bg-secondary);
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
