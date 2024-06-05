<template>
  <el-menu
    class="menu-container"
    :default-active="routePath"
    :collapse="appSetting.menu.collapsed"
    :mode="appSetting.menu.mode"
  >
    <SubMenu :menu="menu" @click="clickMenuItem" />
  </el-menu>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore, useAppSetting } from '@/store'
import { routesHandler } from '@/router'
import SubMenu from './subMenu.vue'

const router = useRouter()
const route = useRoute()
const routePath = computed<string | undefined>(
  () => route.matched[route.matched.length - 1].path
)

const { appSetting } = useAppSetting()

const userStore = useUserStore()
const menu = computed(() => {
  const userMenu = userStore.userMenu || []
  if (!appSetting.value.menu.mergeTopMenu && routePath.value) {
    return routesHandler.getTopMenuByPath(routePath.value)?.children || userMenu
  }
  return userMenu
})

const clickMenuItem = (item: UserMenu) => {
  if (item.link) {
    window.open(item.link)
    return
  }
  if (item.path !== routePath.value) {
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
.menu-container:not(.el-menu--collapse) {
  width: 200px;
  flex: 1;
  &.is-collapse {
    width: 63px;
  }
}
</style>
