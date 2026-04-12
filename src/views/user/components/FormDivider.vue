<template>
  <div class="form__divider">
    <slot>OR</slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.form__divider {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: #8c98a4;

  &::before,
  &::after {
    flex: 1 1 0%;
    border-top: 1px solid rgba(231, 234, 243, 0.7);
    margin-top: 1px;
    content: '';
  }

  &::before {
    margin-right: 24px;
  }

  &::after {
    margin-left: 24px;
  }
}
</style>
