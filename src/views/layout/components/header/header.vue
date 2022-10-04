<template>
  <div class="header-container">
    <div class="header-container__tips">
      <div class="tips__item">
        <MenuCollapsed></MenuCollapsed>
      </div>
      <div class="tips__item">
        <Breadcrumb></Breadcrumb>
      </div>
    </div>
    <div class="header-container__actions">
      <div class="actions__item">
        <UserMenu></UserMenu>
      </div>
      <div class="actions__item">
        <AppSetting></AppSetting>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppSetting, UserMenu, MenuCollapsed, Breadcrumb } from '../index'

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
    display: flex;
    align-items: center;
    .tips__item {
      padding: 0 10px;
    }
  }

  &__actions {
    display: flex;
    height: 100%;
    .actions__item {
      padding: 0 10px;
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
