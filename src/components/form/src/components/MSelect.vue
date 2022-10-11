<template>
  <el-select v-model="value">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formComponentsProps, formComponentsEmits } from './components'

defineOptions({
  name: 'MSelect'
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
