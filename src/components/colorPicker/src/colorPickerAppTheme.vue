<template>
  <div>
    <MColorPicker v-model="color" :options="colorOptions"></MColorPicker>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { computed } from 'vue'
import { colorPickerAppThemeProps } from './colorPickerAppTheme'
import { useAppStore } from '@/store'
import { useCssVariable } from '@/hooks'

defineOptions({
  name: 'MColorPickerAppTheme'
})

const props = defineProps(colorPickerAppThemeProps)

const appStore = useAppStore()

let cssVariable: Ref<string> | null = null
if (props.cssKey) {
  cssVariable = useCssVariable(
    props.cssKey,
    props.getHandler(appStore.appSetting)
  )
}

const color = computed({
  get: () => props.getHandler(appStore.appSetting),
  set: (val) => {
    if (val) {
      if (cssVariable) {
        cssVariable.value = val
      }
      appStore.setAppSetting(props.handler(val))
    }
  }
})

const colorOptions = [
  {
    label: '山雾',
    value: '#ededed'
  },
  {
    label: '薄暮',
    name: 'dust-red',
    value: '#f5222d'
  },
  {
    label: '金盏花',
    value: '#faad14'
  },
  {
    label: '极光绿',
    value: '#52C41A'
  },
  {
    label: '明青',
    value: '#13C2C2'
  },
  {
    label: '拂晓蓝',
    value: '#1890FF'
  },
  {
    label: '酱紫',
    value: '#722ED1'
  },
  {
    label: '绿松石',
    value: '#1abc9c'
  },
  {
    label: '翠',
    value: '#2ecc71'
  },
  {
    label: '河流',
    value: '#3498db'
  },
  {
    label: '紫晶',
    value: '#9b59b6'
  },
  {
    label: '湿沥青',
    value: '#34495e'
  },
  {
    label: '粉红魅力',
    value: '#ff7979'
  }
]
</script>

<style lang="scss" scoped></style>
