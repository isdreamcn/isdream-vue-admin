<template>
  <div class="app-setting-container">
    <m-icon name="icon-setting" @click="drawerVisible = true"></m-icon>
    <el-drawer
      ref="drawerRef"
      v-model="drawerVisible"
      size="25%"
      title="项目配置"
      append-to-body
      class="app-setting-container__drawer"
    >
      <el-divider>主题</el-divider>
      <div class="item--center"><ToggleDark></ToggleDark></div>
      <el-divider>系统主题</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="colorPrimary"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>菜单的背景颜色</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="menu.backgroundColor"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>菜单的文字颜色</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="menu.textColor"
        ></MColorPickerAppTheme>
      </div>
      <el-divider>活动菜单项的背景颜色</el-divider>
      <div class="item--center">
        <MColorPickerAppTheme
          app-setting-key="menu.hoverBackgroundColor"
        ></MColorPickerAppTheme>
      </div>
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
      <el-divider>操作</el-divider>
      <div class="action-buttons">
        <el-button type="primary" @click="copy">
          <MIcon name="icon-copyDocument"></MIcon>拷贝</el-button
        >
        <el-button type="warning" @click="reset"
          ><MIcon name="icon-refresh"></MIcon>重置</el-button
        >
        <el-button type="danger" @click="clearCache"
          ><MIcon name="icon-refreshLeft"></MIcon
          >清空缓存并返回登录页</el-button
        >
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useAppStore, useUserStore } from '@/store'
import { getVal, generateObj } from '@/utils'
import db from '@/storage'
import ToggleDark from '../toggleDark/toggleDark.vue'
import { layoutOptions, getLayout, LayoutKey } from '../../config'

defineOptions({
  name: 'AppSetting'
})

// 显示/隐藏
const drawerVisible = ref(false)

const appStore = useAppStore()
// 当前布局
const layout = computed({
  get: () => appStore.appSetting.layout,
  set: (val) => {
    appStore.setAppSetting({
      layout: val
    })
  }
})

// 修改布局
const layoutChange = (key: LayoutKey) => {
  layout.value = key
  const appSetting = getLayout(key)?.appSetting
  if (appSetting) {
    appStore.setAppSetting(appSetting)
  }
}

// 功能
const functions = computed(() => getLayout(layout.value)?.functions || [])
const getAppSetting = (key: string) => {
  return getVal(appStore.appSetting, key)
}
const setAppSetting = (key: string, val: any) => {
  appStore.setAppSetting(generateObj(key, val))
}

// 操作
const copy = () => {
  navigator.clipboard
    .writeText(JSON.stringify(appStore.appSetting, null, 2))
    .then(() => {
      ElMessageBox.alert(
        '复制成功,请到 src/store/modules/app.ts 中修改配置！',
        '提示',
        {
          confirmButtonText: '确定',
          type: 'success',
          showClose: false
        }
      )
    })
    .catch(() => {
      ElMessageBox.alert('剪贴板拒绝写入', '提示', {
        confirmButtonText: '确定',
        type: 'error',
        showClose: false
      })
    })
}

const reset = () => {
  appStore.resetAppSetting()
}

const clearCache = () => {
  db.clear()
  useUserStore().logout()
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

  .action-buttons {
    display: flex;
    flex-direction: column;
    .el-button {
      margin-bottom: 15px;
      margin-left: 0;
      &:last-child {
        margin-bottom: 0;
      }
      .m-icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
