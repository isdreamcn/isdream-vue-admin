<template>
  <div class="app-setting-container">
    <el-icon @click="updateDrawer(true)"><icon-setting /></el-icon>
    <el-drawer ref="drawerRef" v-model="drawer" size="25%" title="项目配置">
      <el-divider>主题</el-divider>
      <div class="item--center"><ToggleDark></ToggleDark></div>
      <el-divider>系统主题</el-divider>
      <MColorPickerAppTheme
        css-key="--el-color-primary"
        app-setting-key="colorPrimary"
      ></MColorPickerAppTheme>
      <el-divider>布局</el-divider>
      <div class="item--center">
        <MSelect :options="layoutOptions" v-model="layout"></MSelect>
      </div>
      <el-divider>功能</el-divider>
      <div
        v-for="item in functions"
        :key="item.appSettingKey"
        class="item--between"
      >
        <div>
          {{ item.label }}
        </div>
        <el-switch />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { ElDrawer } from 'element-plus'
import { ref, nextTick, computed } from 'vue'
import { ToggleDark } from '../index'
import { layoutOptions, getLayout } from '../../config'
import { useAppStore } from '@/store'

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

// 显示隐藏
const drawer = ref(false)
const updateDrawer = (val: boolean) => {
  drawer.value = val
}

const appStore = useAppStore()
// layout
const layout = computed({
  get: () => appStore.appSetting.layout,
  set: (val) => {
    appStore.setAppSetting({
      layout: val
    })
  }
})

const functions = computed(() => getLayout(layout.value).functions)
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
  .item--between {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
