<template>
  <div class="app-setting-container">
    <el-icon @click="updateDrawer(true)"><icon-setting /></el-icon>
    <el-drawer ref="drawerRef" v-model="drawer" size="25%" title="项目配置">
      <el-divider>主题</el-divider>
      <div class="item--center"><ToggleDark></ToggleDark></div>
      <el-divider>系统主题</el-divider>
      <MColorPickerAppTheme v-bind="colorPrimaryConfig"></MColorPickerAppTheme>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { ElDrawer } from 'element-plus'
import { ref, nextTick } from 'vue'
import { ToggleDark } from '../index'
import { useColorPrimary } from './hooks/useColorPrimary'

defineOptions({
  name: 'AppSetting'
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()

// 取消 el-drawer 懒加载
nextTick(() => {
  if (drawerRef.value) {
    drawerRef.value.rendered = true
  }
})

const drawer = ref(false)
const updateDrawer = (val: boolean) => {
  drawer.value = val
}

const colorPrimaryConfig = useColorPrimary()
</script>

<style lang="scss" scoped>
.app-setting-container {
  font-size: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;

  :deep(.el-drawer__body) {
    padding-top: 0;
    padding-bottom: 0;
  }

  .item--center {
    display: flex;
    justify-content: center;
  }
}
</style>
