<template>
  <el-container class="m-layout main-layout">
    <el-aside>
      <Logo></Logo>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="m-layout__header">
          <div class="m-layout__header-tips">
            <div class="m-layout__header-tips-item">
              <MenuCollapsed></MenuCollapsed>
            </div>
            <div class="m-layout__header-tips-item">
              <Breadcrumb></Breadcrumb>
            </div>
          </div>
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
      <div class="main-layout__container">
        <el-main>
          <slot></slot>
        </el-main>
        <Footer />
      </div>
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
  Footer
} from '../components'

defineOptions({
  name: 'MainLayout'
})
</script>

<style scoped lang="scss">
.main-layout {
  position: relative;
  height: 100%;
  .el-aside {
    display: flex;
    flex-direction: column;
    width: auto;
  }
  .el-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-header {
      padding: 0;
      .m-layout__header-actions {
        margin-right: 20px;
      }
    }
    .main-layout__container {
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
