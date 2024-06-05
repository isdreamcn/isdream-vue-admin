<template>
  <el-container class="m-layout main-layout">
    <el-header class="m-layout__header">
      <div class="m-layout__header-tips">
        <Logo></Logo>
      </div>
      <div class="m-layout__header-actions">
        <div class="m-layout__header-actions-item">
          <UserMenu></UserMenu>
        </div>
        <div class="m-layout__header-actions-item">
          <AppSetting></AppSetting>
        </div>
      </div>
    </el-header>
    <el-container class="main-layout__container">
      <el-main class="main-layout__main">
        <div style="flex: 1" class="nav-menus-container">
          <div class="nav-menus">
            <div
              v-for="(item, index) in routesHandler.topMenuData.value"
              class="nav-menu"
              :key="item.path"
              :style="`background-color: ${
                themColors[index % themColors.length]
              };`"
              @click="goPage(item.path)"
            >
              <MIcon
                v-if="item.meta?.icon"
                :name="item.meta.icon"
                :size="80"
                color="#ffffff"
              ></MIcon>
              <div class="nav-menu__title">
                {{ item.meta?.title || item.path }}
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { routesHandler } from '@/router'
import { Logo, UserMenu, AppSetting, Footer } from '@/views/layout/components'

const themColors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#34495e'
]

const router = useRouter()
const goPage = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
@use '@/views/layout/layout.scss';
.main-layout {
  position: relative;
  height: 100%;
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
    .nav-menus-container {
      display: flex;
      align-items: center;
      justify-content: center;
      .nav-menus {
        width: 4 * 260px;
        min-height: 2 * 260px;
        display: flex;
        flex-wrap: wrap;
        .nav-menu {
          width: 240px;
          height: 240px;
          margin: 10px;
          border-radius: 6px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &__title {
            font-size: 30px;
            color: #ffffff;
            margin-top: 10px;
          }
          &:hover {
            filter: brightness(70%);
            transition: 0.3s;
          }
        }
      }
    }
  }
}
</style>
