<template>
  <div class="route-history__container">
    <el-tag
      v-for="(route, index) in routeHistory"
      :key="route.pathKey"
      :closable="index !== 0"
      :effect="routePathKey === route.pathKey ? 'dark' : 'plain'"
      :type="
        hoverRoutePathKey === route.pathKey || routePathKey === route.pathKey
          ? ''
          : 'info'
      "
      @mouseover="mouseover(route.pathKey)"
      @mouseout="mouseout"
      @close="handleClose(route.pathKey, routeHistory[index - 1].pathKey)"
      @click="goPath(route.pathKey)"
      >{{ route.meta.title || route.pathKey }}</el-tag
    >
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRouterStore } from '@/store'

defineOptions({
  name: 'LayoutCpnRouteHistory'
})

const routerStore = useRouterStore()
const routeHistory = computed(() => routerStore.routeHistory)

// 鼠标悬浮的routeName
const hoverRoutePathKey = ref('')
const mouseout = () => {
  hoverRoutePathKey.value = ''
}
const mouseover = (name: string) => {
  hoverRoutePathKey.value = name
}

// 当前的路由path
const route = useRoute()
const routePathKey = computed(
  () => route.matched[route.matched.length - 1].path
)

// 移除
const handleClose = (pathKey: string, prePathKey: string) => {
  routerStore.deleteRouteHistory(pathKey)
  if (pathKey === routePathKey.value) {
    goPath(prePathKey)
  }
}

const router = useRouter()
const goPath = (pathKey: string) => {
  if (pathKey === routePathKey.value) {
    return
  }
  router.push({
    path: pathKey
  })
}
</script>

<style lang="scss" scoped>
.route-history__container {
  padding: 5px;
  border-bottom: solid 1px var(--el-menu-border-color);
  .el-tag {
    cursor: pointer;
    margin: 0 5px;
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
