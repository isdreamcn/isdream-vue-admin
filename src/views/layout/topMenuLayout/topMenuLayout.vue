<template>
  <el-container class="m-layout top-menu-layout">
    <el-header class="m-layout__header">
      <Logo></Logo>
      <Menu></Menu>
      <div class="m-layout__header-actions">
        <div class="m-layout__header-actions-item">
          <UserMenu></UserMenu>
        </div>
        <div class="m-layout__header-actions-item">
          <AppSetting></AppSetting>
        </div>
      </div>
    </el-header>
    <el-container class="top-menu-layout__container">
      <el-container>
        <el-header style="padding: 0; height: auto">
          <RouteHistory></RouteHistory>
        </el-header>
        <el-main class="top-menu-layout__main">
          <div style="flex: 1">
            <slot></slot>
          </div>
          <Footer />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {
  Menu,
  Logo,
  UserMenu,
  AppSetting,
  RouteHistory,
  Footer
} from '../components'
</script>

<style scoped lang="scss">
.top-menu-layout {
  position: relative;
  height: 100%;
  .el-header {
    padding: 0;
    .m-layout__header-actions {
      margin-right: 20px;
    }

    .el-menu {
      display: flex;
      justify-content: center;
      border: none;
    }
  }
  .top-menu-layout__container {
    height: calc(100% - var(--el-header-height));
    overflow-y: auto;
  }
  .top-menu-layout__main {
    display: flex;
    flex-direction: column;
  }
}
</style>
