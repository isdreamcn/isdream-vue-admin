<template>
  <div v-if="appSetting.showLogo" class="logo-container">
    <template v-if="!appSetting.menu.mergeTopMenu && topMenu">
      <MIcon v-if="topMenu.icon" :name="topMenu.icon" :size="26"></MIcon>
      <span>{{ topMenu.title }}</span>
    </template>
    <template v-else>
      <img src="/favicon.ico" />
      <span>LOGO</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppSetting } from '@/store'
import { routesHandler } from '@/router'

const route = useRoute()
const { appSetting } = useAppSetting()

const topMenu = computed(() => {
  const path = route.matched[route.matched.length - 1].path
  return routesHandler.getTopMenuByPath(path)
})
</script>

<style lang="scss" scoped>
.logo-container {
  @include m-menu-theme(true);
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 45px;
    height: 45px;
  }

  span {
    margin-left: 10px;
  }
}
</style>
