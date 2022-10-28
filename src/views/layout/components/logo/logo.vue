<template>
  <div v-if="appSetting.showLogo" class="logo-container">LOGO</div>
</template>

<script setup lang="ts">
import { useAppSetting } from '@/store'

defineOptions({
  name: 'LayoutCpnMenuLogo'
})

const { appSetting } = useAppSetting()
</script>

<style lang="scss" scoped>
.logo-container {
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: solid 1px var(--el-menu-border-color);
  border-right: solid 1px var(--el-menu-border-color);
}
</style>
