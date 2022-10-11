<template>
  <el-radio-group v-model="value">
    <el-radio
      v-for="item in props.options"
      :key="item.value"
      :label="item.value"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formComponentsProps, formComponentsEmits } from './components'

defineOptions({
  name: 'MRadioGroup'
})

const props = defineProps(formComponentsProps)
const emit = defineEmits(formComponentsEmits)

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped></style>
