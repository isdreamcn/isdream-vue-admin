<template>
  <el-container class="main-layout">
    <MLoadingLottie :loading="loading"></MLoadingLottie>
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <RouteHistory></RouteHistory>
      <div class="main-layout__container">
        <el-main>
          <slot></slot>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Menu, Header, RouteHistory, Footer } from '../components'
import { useRouterStore } from '@/store'

defineOptions({
  name: 'TopMenuLayout'
})
const routerStore = useRouterStore()
const loading = computed(() => routerStore.loading)
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
