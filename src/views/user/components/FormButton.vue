<template>
  <button class="form__button" type="submit" :disabled="loading">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<style scoped lang="scss">
.form__button {
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 14px 16px;
  color: #ffffff;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border-radius: 4px;
  background-color: #377dff;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 4px 11px rgba(55, 125, 255, 0.35);
    background-color: #2f6ad9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
}
</style>
