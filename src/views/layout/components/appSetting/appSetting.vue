<template>
  <div class="app-setting-container">
    <el-icon @click="updateDrawer(true)"><icon-setting /></el-icon>
    <el-drawer
      ref="drawerRef"
      v-model="drawer"
      size="25%"
      title="项目配置"
      append-to-body
      custom-class="app-setting-container__drawer"
    >
      <el-divider>主题</el-divider>
      <div class="item--center"><ToggleDark></ToggleDark></div>
      <el-divider>系统主题</el-divider>
      <MColorPickerAppTheme
        css-key="--el-color-primary"
        app-setting-key="colorPrimary"
      ></MColorPickerAppTheme>
      <el-divider>菜单的背景颜色</el-divider>
      <MColorPickerAppTheme
        css-key="--bg-color"
        app-setting-key="menu.backgroundColor"
      ></MColorPickerAppTheme>
      <el-divider>菜单的文字颜色</el-divider>
      <MColorPickerAppTheme
        css-key="--text-color"
        app-setting-key="menu.textColor"
      ></MColorPickerAppTheme>
      <el-divider>活动菜单项的背景颜色</el-divider>
      <MColorPickerAppTheme
        css-key="--hover-bg-color"
        app-setting-key="menu.hoverBackgroundColor"
      ></MColorPickerAppTheme>
      <el-divider>布局</el-divider>
      <div class="item--center">
        <MSelect
          :options="layoutOptions"
          :model-value="layout"
          @change="layoutChange"
        ></MSelect>
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
        <el-switch
          :model-value="getAppSetting(item.appSettingKey)"
          @change="(v: any) => setAppSetting(item.appSettingKey, v)"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { ElDrawer } from 'element-plus'
import type { LayoutKeys } from '../../config'
import { ref, nextTick, computed } from 'vue'
import { ToggleDark } from '../index'
import { layoutOptions, getLayout } from '../../config'
import { useAppStore } from '@/store'
import { getVal, generateObj } from '@/utils'

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
    appStore.resetAppSetting()
    appStore.setAppSetting({
      layout: val
    })
  }
})

const layoutChange = (key: LayoutKeys) => {
  layout.value = key
  appStore.setAppSetting(getLayout(key).appSetting)
}

const functions = computed(() => getLayout(layout.value).functions)
const getAppSetting = (key: string) => {
  return getVal(appStore.appSetting, key)
}
const setAppSetting = (key: string, val: any) => {
  appStore.setAppSetting(generateObj(key, val))
}
</script>

<style lang="scss" scoped>
.app-setting-container {
  font-size: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.app-setting-container__drawer {
  .el-drawer__body {
    padding-top: 0;
  }

  .item--center {
    display: flex;
    justify-content: center;
  }
  .item--between {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
