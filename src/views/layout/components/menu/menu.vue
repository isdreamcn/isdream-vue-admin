<template>
  <el-menu
    class="menu-container"
    :default-active="routePath"
    :collapse="collapsed"
    :mode="mode"
  >
    <SubMenu :menu="menu" @click="clickMenuItem" />
  </el-menu>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore, useAppStore } from '@/store'
import SubMenu from './subMenu.vue'

const router = useRouter()
const route = useRoute()
const routePath = computed<string | undefined>(
  () => route.matched[route.matched.length - 1].path
)

const appStore = useAppStore()
const collapsed = computed(() => appStore.appSetting.menu.collapsed)
const mode = computed(() => appStore.appSetting.menu.mode)

const userStore = useUserStore()
const menu = computed(() => userStore.userMenu || [])

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
