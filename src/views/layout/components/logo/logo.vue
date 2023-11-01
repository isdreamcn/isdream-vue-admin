<template>
  <div v-if="appSetting.showLogo" class="logo-container">
    <img src="/favicon.ico" />
    <span>LOGO</span>
  </div>
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
