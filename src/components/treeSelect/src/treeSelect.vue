<template>
  <el-tree-select
    class="m-tree-select"
    clearable
    filterable
    v-bind="$attrs"
    :data="_data"
    v-model="modelValue"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { treeSelectProps, treeSelectEmits } from './treeSelect'
import { updateObjKeys } from '@/utils'

defineOptions({
  name: 'MTreeSelect'
})

const props = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)

const modelValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (val: any) => {
    emit('update:modelValue', val)
  }
})

const _data = computed(() => {
  return updateObjKeys(
    props.data,
    {
      value: props.fields.value ?? 'id',
      label: props.fields.label ?? 'name',
      children: props.fields.children ?? 'children'
    },
    props.fields?.children ?? 'children'
  )
})
</script>

<style lang="scss" scoped>
.m-tree-select {
}
</style>
