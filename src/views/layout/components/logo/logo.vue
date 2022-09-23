<template>
  <div class="logo-container">LOGO</div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutCpnMenuLogo'
})
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
