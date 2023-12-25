<template>
  <div class="m-search-tree" :style="{ height: props.height }">
    <div class="m-search-tree__input">
      <el-input
        v-model="filterText"
        placeholder="请输入"
        suffix-icon="icon-search"
      />
    </div>

    <div class="m-search-tree__tree">
      <el-tree
        ref="treeRef"
        default-expand-all
        highlight-current
        v-bind="$attrs"
        :data="_data"
        node-key="value"
        :filter-node-method="filterNode"
        @currentChange="selectChange"
        @checkChange="selectChange"
      />
    </div>

    <div class="m-search-tree__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ElTree } from 'element-plus'
import { ref, watch, computed, useAttrs, toRaw, nextTick } from 'vue'
import { searchTreeProps, searchTreeEmits } from './searchTree'
import { updateObjKeys, debounce } from '@/utils'

defineOptions({
  name: 'MSearchTree'
})

const props = defineProps(searchTreeProps)
const emits = defineEmits(searchTreeEmits)
const attrs = useAttrs()

const treeRef = ref<InstanceType<typeof ElTree>>()

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

// 筛选
const filterText = ref('')
watch(filterText, (val) => {
  treeRef.value?.filter(val)
})

const filterNode = (value: string, data: Record<string, any>) => {
  if (!value) return true
  return data.label.includes(value)
}

// showCheckbox ? 勾选的节点 : 被选中节点
const showCheckbox = computed(
  () => attrs['show-checkbox'] !== undefined && attrs['show-checkbox'] !== false
)

// v-model
let selectKeys: any

const selectChange = debounce(() => {
  selectKeys = showCheckbox.value
    ? treeRef.value?.getCheckedKeys()
    : treeRef.value?.getCurrentKey()

  emits('update:modelValue', selectKeys)
})

const setSelectKeys = (val?: any) => {
  selectKeys = val
  if (showCheckbox.value) {
    treeRef.value?.setCheckedKeys(selectKeys || [])
  } else {
    treeRef.value?.setCurrentKey(selectKeys)
  }
}

// 默认选中
nextTick(() => setSelectKeys(toRaw(props.modelValue)))

watch(
  () => props.modelValue,
  () => {
    const value = toRaw(props.modelValue)
    if (selectKeys === value) return

    setSelectKeys(value)
  }
)
</script>

<style lang="scss" scoped>
.m-search-tree {
  display: flex;
  flex-direction: column;
  height: 600px;
  &__input {
    flex-shrink: 0;
  }
  &__tree {
    margin: 15px 0;
    flex: 1;
    overflow-y: auto;
  }
  &__footer {
    flex-shrink: 0;
    display: flex;
  }
}
</style>
