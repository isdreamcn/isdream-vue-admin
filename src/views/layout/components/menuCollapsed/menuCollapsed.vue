<template>
  <div class="fold-expand">
    <MIcon
      v-show="collapsed"
      name="icon-expand"
      @click="setMenuCollapsed"
    ></MIcon>
    <MIcon
      v-show="!collapsed"
      name="icon-fold"
      @click="setMenuCollapsed"
    ></MIcon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'

defineOptions({
  name: 'LayoutCpnMenuCollapsed'
})

const appStore = useAppStore()
const collapsed = computed(() => appStore.appSetting.menu.collapsed)

const setMenuCollapsed = () => {
  appStore.setAppSetting({
    menu: {
      collapsed: !collapsed.value
    }
  })
}
</script>

<style lang="scss" scoped>
.fold-expand {
  font-size: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
