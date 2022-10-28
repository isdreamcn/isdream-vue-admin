<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in matched" :key="item.path">
      <a v-if="item.children" @click="goPath(item)">{{
        item.meta?.title || item.path
      }}</a>
      <div v-else>
        {{ item.meta?.title || item.path }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { RouteMapItem } from '@/router'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import appConfig from '@/config'
import { routesHandler } from '@/router'

defineOptions({
  name: 'LayoutCpnBreadcrumb'
})

const route = useRoute()
const matched = computed(() => {
  const path = route.matched[route.matched.length - 1].path
  let _route = routesHandler.getRouteByPath(path)
  const _matched: RouteMapItem[] = []
  while (_route) {
    _matched.unshift(_route)
    _route = _route.parent
  }
  return _matched.filter(
    (item) =>
      !(item.meta?.hiddenInBread ?? appConfig.defaultRouteMeta.hiddenInBread)
  )
})

const router = useRouter()
const goPath = (route: RouteMapItem) => {
  let path = routesHandler.getNotChildRoute(route.children!)?.path
  if (path) {
    router.push(path)
  }
}
</script>

<style lang="scss" scoped></style>
