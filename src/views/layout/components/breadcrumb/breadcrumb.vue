<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in matched" :key="item.pathKey">
      <a v-if="item.children" @click="goPath(item.pathKey)">{{
        item.meta?.title || item.pathKey
      }}</a>
      <div v-else>
        {{ item.meta?.title || item.pathKey }}
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
  const pathKey = route.matched[route.matched.length - 1].path
  let _route = routesHandler.getRouteByPathKey(pathKey)
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
const goPath = (path: string) => {
  router.push(path)
}
</script>

<style lang="scss" scoped></style>
