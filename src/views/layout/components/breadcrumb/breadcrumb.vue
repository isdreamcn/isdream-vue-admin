<template>
  <el-breadcrumb
    class="m-breadcrumb"
    v-if="appSetting.breadcrumb.show"
    separator="/"
  >
    <el-breadcrumb-item v-for="item in matched" :key="item.path">
      <a @click="goPath(item.path)">
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
import { computed } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { appConfig } from '@/config'
import { routesHandler } from '@/router'
import { useAppSetting } from '@/store'

const { appSetting } = useAppSetting()

const route = useRoute()
const matched = computed(() => {
  const path = route.matched[route.matched.length - 1].path
  let routeData = routesHandler.getRouteByPath(path)
  const _matched: RouteRecordRaw[] = []
  while (routeData) {
    _matched.unshift(routeData.route)
    routeData = routeData.parentNode
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
