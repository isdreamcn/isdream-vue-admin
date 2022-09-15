<template>
  <div class="header-container">
    <div class="header-container__tips">
      <div class="fold-expand">
        <!-- <el-icon><icon-expand /></el-icon> -->
        <el-icon><icon-fold /></el-icon>
      </div>
    </div>
    <div class="header-container__actions">
      <ToggleDark></ToggleDark>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleDark from '../toggleDark/toggleDark.vue'

defineOptions({
  name: 'LayoutCpnHeader'
})
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;

  .fold-expand {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
