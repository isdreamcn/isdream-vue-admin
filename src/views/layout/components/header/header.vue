<template>
  <div class="header-container">
    <div class="header-container__tips">
      <MenuCollapsed></MenuCollapsed>
    </div>
    <div class="header-container__actions">
      <div class="actions__item">
        <UserMenu></UserMenu>
      </div>
      <div class="actions__item">
        <ToggleDark></ToggleDark>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleDark, UserMenu, MenuCollapsed } from '../index'

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
  border-bottom: solid 1px var(--el-menu-border-color);

  &__tips {
  }

  &__actions {
    display: flex;
    height: 100%;
    .actions__item {
      padding: 0 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: var(--el-menu-hover-bg-color);
      }
    }
  }
}
</style>
