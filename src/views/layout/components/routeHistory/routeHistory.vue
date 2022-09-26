<template>
  <div class="route-history__container">
    <el-tag
      v-for="(route, index) in routeHistory"
      :key="route.name"
      :closable="index !== 0"
      :effect="routeName === route.name ? 'dark' : 'plain'"
      :type="
        hoverRouteName === route.name || routeName === route.name ? '' : 'info'
      "
      @mouseover="mouseover(route.name)"
      @mouseout="mouseout"
      @close="handleClose(route.name, routeHistory[index - 1].name)"
      @click="goPath(route.name)"
      >{{ route.meta.title || route.name }}</el-tag
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
const hoverRouteName = ref('')
const mouseout = () => {
  hoverRouteName.value = ''
}
const mouseover = (name: string) => {
  hoverRouteName.value = name
}

// 当前的路由name
const route = useRoute()
const routeName = computed(() => route.name)

// 移除
const handleClose = (name: string, preName: string) => {
  routerStore.deleteRouteHistory(name)
  if (name === routeName.value) {
    goPath(preName)
  }
}

const router = useRouter()
const goPath = (name: string) => {
  if (name === routeName.value) {
    return
  }
  router.push({
    name
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
