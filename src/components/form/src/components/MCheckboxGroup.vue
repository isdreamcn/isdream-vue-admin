<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="item in props.options"
      :key="item.value"
      :label="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formComponentsProps, formComponentsEmits } from './components'

defineOptions({
  name: 'MCheckboxGroup'
})

const props = defineProps(formComponentsProps)
const emit = defineEmits(formComponentsEmits)

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val: any[]) => {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped></style>
