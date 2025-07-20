<template>
  <div v-if="appSetting.routeHistory.show" class="route-history__container">
    <div class="route-history__tags">
      <el-tag
        v-for="(route, index) in routeHistory"
        :key="route.path"
        :closable="index !== 0"
        :effect="routePath === route.path ? 'dark' : 'plain'"
        :type="
          hoverRoutePath === route.path || routePath === route.path
            ? undefined
            : 'info'
        "
        @mouseover="mouseover(route.path)"
        @mouseout="mouseout"
        @close="handleClose(route.path, routeHistory[index - 1].path)"
        @click="goPath(route.path)"
        >{{ route.meta.title || route.path }}</el-tag
      >
    </div>
    <div v-if="appSetting.routeHistory.actions" class="route-history__actions">
      <el-dropdown>
        <m-icon name="icon-arrowDown"></m-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeTags((a, b) => a > b)"
              >关闭左侧</el-dropdown-item
            >
            <el-dropdown-item @click="closeTags((a, b) => a < b)"
              >关闭右侧</el-dropdown-item
            >
            <el-dropdown-item divided @click="closeTags((a, b) => a !== b)"
              >关闭其它</el-dropdown-item
            >
            <el-dropdown-item @click="closeTags(() => true)"
              >关闭全部</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRouterStore, useAppSetting } from '@/store'

const { appSetting } = useAppSetting()
const routerStore = useRouterStore()
const routeHistory = computed(() => routerStore.routeHistory)

// 鼠标悬浮的routeName
const hoverRoutePath = ref('')
const mouseout = () => {
  hoverRoutePath.value = ''
}
const mouseover = (name: string) => {
  hoverRoutePath.value = name
}

// 当前的路由path
const route = useRoute()
const routePath = computed(() => route.fullPath)

// 移除
const handleClose = (path: string, beforePath: string) => {
  routerStore.deleteRouteHistory(path)
  if (path === routePath.value) {
    goPath(beforePath)
  }
}

type closeTagVerify = (currIndex: number, index: number) => boolean
// 操作
const closeTags = (verify: closeTagVerify) => {
  if (!verify) {
    return
  }
  const currIndex = routeHistory.value.findIndex(
    (item) => item.path === routePath.value
  )

  routeHistory.value.forEach((item, index) => {
    if (index && verify(currIndex, index)) {
      routerStore.deleteRouteHistory(item.path)
    }
  })

  // 全部关闭
  if (routeHistory.value.length === 1) {
    goPath(routeHistory.value[0].path)
  }
}

// 跳转
const router = useRouter()
const goPath = (path: string) => {
  if (path === routePath.value) {
    return
  }
  router.push(path)
}
</script>

<style lang="scss" scoped>
.route-history__container {
  margin-top: 5px;
  border-bottom: solid 1px var(--border-color);
  display: flex;
  justify-content: space-between;
  .route-history__actions {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  .el-tag {
    cursor: pointer;
    margin: 0 5px 5px 5px;
    :deep(.el-icon) {
      opacity: 0;
    }
    &:hover {
      :deep(.el-icon) {
        opacity: 1;
      }
    }
  }
}
</style>
