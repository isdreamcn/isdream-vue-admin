<template>
  <el-container class="main-layout">
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <div class="main-layout__container">
        <el-main>
          <!-- <div style="height: 1500px"></div> -->
          <RouterView></RouterView>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { Menu, Header, Footer } from '../components'

defineOptions({
  name: 'MainLayout'
})
</script>

<style scoped lang="scss">
.main-layout {
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
    }
    .main-layout__container {
      flex: 1;
      overflow-y: auto;
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
