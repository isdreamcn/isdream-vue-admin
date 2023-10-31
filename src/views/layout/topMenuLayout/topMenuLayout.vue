<template>
  <el-container class="m-layout top-menu-layout">
    <el-header>
      <Logo></Logo>
      <Menu></Menu>
      <div class="m-layout__header">
        <div class="m-layout__header-actions">
          <div class="m-layout__header-actions-item">
            <UserMenu></UserMenu>
          </div>
          <div class="m-layout__header-actions-item">
            <AppSetting></AppSetting>
          </div>
        </div>
      </div>
    </el-header>
    <RouteHistory></RouteHistory>
    <div class="top-menu-layout__container">
      <el-main>
        <slot></slot>
      </el-main>
      <Footer />
    </div>
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

defineOptions({
  name: 'TopMenuLayout'
})
</script>

<style scoped lang="scss">
.top-menu-layout {
  position: relative;
  height: 100%;
  &.el-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-header {
      padding: 0;
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px var(--border-color);
      .m-layout__header-actions {
        margin-right: 20px;
      }

      .top-menu-layout_actions {
        display: flex;
        align-items: center;
      }

      .el-menu {
        display: flex;
        justify-content: center;
        border: none;
      }

      .logo-container {
        width: 200px;
        height: 100%;
        border-right: none;
      }
    }
    .top-menu-layout__container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      .el-main {
        overflow: visible;
      }
    }
  }
}
</style>
