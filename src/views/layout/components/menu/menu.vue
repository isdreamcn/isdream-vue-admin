<template>
  <Logo></Logo>
  <el-menu
    :default-active="routeName"
    class="menu-container"
    :collapse="collapsed"
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
import { Logo } from '../index'

defineOptions({
  name: 'LayoutCpnMenu'
})

const router = useRouter()
const routeName = computed<string | undefined>(() => {
  const route = useRoute()
  return String(route.name)
})

const appStore = useAppStore()
const collapsed = computed(() => appStore.appSetting.menu.collapsed)

const userStore = useUserStore()
const menu = userStore.userMenu || []

const clickMenuItem = (item: UserMenu) => {
  if (item.link) {
    window.open(item.link)
    return
  }
  if (item.name !== routeName.value) {
    router.push({
      name: item.name
    })
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  flex: 1;
}
.menu-container:not(.el-menu--collapse) {
  width: 200px;
  flex: 1;
  &.is-collapse {
    width: 63px;
  }
}
</style>
