<template>
  <div class="toggleDark-container" @click="toggleDark">
    <m-icon name="icon-sunny" v-show="!isDark"></m-icon>
    <m-icon name="icon-moon" v-show="isDark"></m-icon>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@/hooks'
const { isDark, toggleDark } = useDark()
</script>

<style lang="scss" scoped>
.toggleDark-container {
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
