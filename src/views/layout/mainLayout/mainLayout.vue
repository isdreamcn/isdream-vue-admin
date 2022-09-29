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
          <component :is="createBasicLayout('MainLayout')"></component>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, Header, RouteHistory, Footer } from '../components'
import { createBasicLayout } from '../index'

defineOptions({
  name: 'MainLayout'
})

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 3000)
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
      .el-footer {
      }
    }
  }
}
</style>
