<template>
  <div class="m-color-picker-appTheme">
    <MColorPicker v-model="color" :options="props.options"></MColorPicker>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { computed } from 'vue'
import { colorPickerAppThemeProps } from './colorPickerAppTheme'
import { useAppStore } from '@/store'
import { useCssVariable } from '@/hooks'
import { generateObj, getVal, isString } from '@/utils'

defineOptions({
  name: 'MColorPickerAppTheme'
})

const props = defineProps(colorPickerAppThemeProps)

const appStore = useAppStore()
const colorVal = computed(() => {
  const color = getVal(appStore.appSetting, props.appSettingKey)
  return isString(color) ? color : ''
})

let cssVariable: Ref<string> | null = null
if (props.cssKey) {
  cssVariable = useCssVariable(props.cssKey, colorVal.value)
}

const color = computed({
  get: () => colorVal.value,
  set: (val) => {
    if (val) {
      if (cssVariable) {
        cssVariable.value = val
      }
      appStore.setAppSetting(generateObj(props.appSettingKey, val))
    }
  }
})
</script>

<style lang="scss" scoped></style>
