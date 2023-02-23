<template>
  <div class="m-color-picker">
    <el-tooltip
      v-for="colorItem in colorOptions"
      :key="colorItem.value"
      effect="dark"
      :content="colorItem.label"
      placement="top"
      :disabled="!colorItem.label"
    >
      <div
        :class="[
          'color-options-item',
          { 'is-select': colorValue === colorItem.value }
        ]"
        :style="{
          'background-color': colorItem.value
        }"
        @click="updateColor(colorItem.value)"
      ></div>
    </el-tooltip>
    <el-color-picker v-if="props.custom" v-model="colorValue" />
  </div>
</template>

<script setup lang="ts">
import type { ColorPickerOptionsItem } from './colorPicker'
import { computed } from 'vue'
import { colorPickerProps, colorPickerEmits } from './colorPicker'

defineOptions({
  name: 'MColorPicker'
})

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const updateColor = (color?: string) => {
  if (color) {
    emit('update:modelValue', color)
    emit('change', color)
  }
}

const colorValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    updateColor(val)
  }
})

// 去除value重复项
const colorOptions = computed(() => {
  const map = new Map<string, ColorPickerOptionsItem>()
  props.options.forEach((item) => {
    if (!map.get(item.value)) {
      map.set(item.value, item)
    }
  })
  return [...map.values()]
})
</script>

<style lang="scss" scoped>
.m-color-picker {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  .color-options-item {
    margin: 8px;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    cursor: pointer;
    &.is-select {
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        content: '';
        width: 50%;
        height: 25%;
        display: inline-block;
        border: 1px solid #ffffff;
        border-width: 0 0 2px 2px;
        transform: translateY(-25%) rotate(-45deg);
      }
    }
  }
  :deep(.el-color-picker__trigger) {
    width: 50px;
  }
}
</style>
