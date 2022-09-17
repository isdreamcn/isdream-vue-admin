<template>
  <el-menu default-active="2" class="menu-container" :collapse="isCollapse">
    <el-sub-menu index="1">
      <template #title>
        <MIcon name="icon-location"></MIcon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <MIcon name="icon-menu"></MIcon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <MIcon name="icon-document"></MIcon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <MIcon name="icon-setting"></MIcon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'LayoutCpnMenu'
})

const isCollapse = ref(false)
</script>

<style lang="scss" scoped>
.menu-container:not(.el-menu--collapse) {
  width: 200px;
  flex: 1;
}
</style>
