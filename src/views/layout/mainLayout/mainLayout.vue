<template>
  <el-container class="m-layout main-layout">
    <el-header class="m-layout__header">
      <div class="m-layout__header-tips">
        <Logo></Logo>
        <div class="m-layout__header-tips-item">
          <MenuCollapsed></MenuCollapsed>
        </div>
        <div class="m-layout__header-tips-item">
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div class="m-layout__header-actions">
        <div class="m-layout__header-actions-item" style="padding: 0">
          <GoBackTopMenuNav></GoBackTopMenuNav>
        </div>
        <div class="m-layout__header-actions-item">
          <UserMenu></UserMenu>
        </div>
        <div class="m-layout__header-actions-item">
          <AppSetting></AppSetting>
        </div>
      </div>
    </el-header>
    <el-container class="main-layout__container">
      <el-aside>
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header style="padding: 0; height: auto">
          <RouteHistory></RouteHistory>
        </el-header>
        <el-main class="main-layout__main">
          <div style="flex: 1">
            <slot></slot>
          </div>
          <Footer></Footer>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {
  Menu,
  Logo,
  MenuCollapsed,
  Breadcrumb,
  UserMenu,
  AppSetting,
  RouteHistory,
  Footer,
  GoBackTopMenuNav
} from '../components'
</script>

<style scoped lang="scss">
@use '../layout.scss';
.main-layout {
  position: relative;
  height: 100%;
  .el-aside {
    width: auto;
    overflow-x: hidden;
  }
  .el-header {
    padding: 0;
    .m-layout__header-actions {
      margin-right: 20px;
    }
  }
  .main-layout__container {
    height: calc(100% - var(--el-header-height));
    overflow-y: auto;
  }
  .main-layout__main {
    display: flex;
    flex-direction: column;
  }
}
</style>
