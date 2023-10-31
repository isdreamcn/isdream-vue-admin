<template>
  <el-breadcrumb
    class="m-breadcrumb"
    v-if="appSetting.breadcrumb.show"
    separator="/"
  >
    <el-breadcrumb-item v-for="item in matched" :key="item.path">
      <a @click="item.children ? goPath(item) : NOOP">
        <MIcon
          v-if="appSetting.breadcrumb.icon && item.meta?.icon"
          :name="item.meta.icon"
        ></MIcon>
        {{ item.meta?.title || item.path }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { RouteMapItem } from '@/router'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { appConfig } from '@/config'
import { routesHandler } from '@/router'
import { NOOP } from '@/utils'
import { useAppSetting } from '@/store'

defineOptions({
  name: 'LayoutCpnBreadcrumb'
})

const { appSetting } = useAppSetting()

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

<style lang="scss" scoped>
.m-breadcrumb {
  a {
    @include m-menu-theme();
    display: flex;
    align-items: center;
    .m-icon {
      margin-right: 5px;
    }
  }
}
</style>
