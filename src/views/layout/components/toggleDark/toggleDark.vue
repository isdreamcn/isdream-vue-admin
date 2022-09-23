<template>
  <div class="toggleDark-container" @click="toggleDark">
    <el-icon>
      <icon-sunny v-show="!isDark" />
      <icon-moon v-show="isDark" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@/hooks'
const { isDark, toggleDark } = useDark()

defineOptions({
  name: 'LayoutCpnToggleDark'
})
</script>

<style lang="scss" scoped>
.toggleDark-container {
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
