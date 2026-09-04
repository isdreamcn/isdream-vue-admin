<template>
  <component
    :is="inline ? 'div' : ElCol"
    v-if="visible"
    v-bind="mergedColAttrs"
  >
    <el-form-item :label="label" :prop="field.key">
      <component
        v-bind="{
          ...attrs,
          key: field.key,
          disabled: attrs.disabled ?? disabled
        }"
        :is="field.tag"
        v-if="field.slot !== true"
        v-model="formData[field.key]"
        :placeholder="placeholder"
        v-on="field.on || {}"
      ></component>
      <slot
        v-else
        :name="field.key"
        v-bind="{
          ...attrs,
          key: field.key,
          disabled: attrs.disabled ?? disabled
        }"
        :value="formData[field.key]"
      ></slot>
    </el-form-item>
  </component>
</template>

<script setup lang="ts">
import type { FormField, FormProps } from './form'
import { computed, inject } from 'vue'
import { ElCol } from 'element-plus'
import { isFunction } from '@/utils'
import { formDataKey, isFieldVisible } from './hooks'

// 字段级渲染子组件：显隐判断与函数式 attrs 解析下沉到每个字段独立的 computed，
// 依赖收集为属性级——表单数据变化时仅真正读取该属性的字段重渲染，
// MForm 自身（v-for 遍历原始 fields，引用稳定）不随输入重渲染
defineOptions({ name: 'MFormRenderItem' })

const props = defineProps<{
  field: FormField
  inline: boolean
  disabled: boolean
  colAttrs: FormProps['colAttrs']
}>()

// MForm 内部表单数据（ref），字段内按属性建立响应式依赖
const formData = inject(formDataKey)
if (!formData) {
  throw new Error('MFormRenderItem 仅可在 MForm 内部使用')
}

const visible = computed(() => isFieldVisible(props.field, formData.value))
const attrs = computed(() =>
  isFunction(props.field.attrs)
    ? props.field.attrs(formData.value)
    : (props.field.attrs ?? {})
)
const label = computed(() => props.field.label ?? props.field.key)
const placeholder = computed(
  () => attrs.value.placeholder ?? props.field.label ?? props.field.key
)
const mergedColAttrs = computed(() => {
  const defaultColAttrs =
    typeof props.colAttrs === 'number'
      ? { span: props.colAttrs }
      : props.colAttrs
  if (!props.field.colAttrs) {
    return defaultColAttrs
  }
  const fieldColAttrs =
    typeof props.field.colAttrs === 'number'
      ? { span: props.field.colAttrs }
      : props.field.colAttrs
  return Object.assign({}, defaultColAttrs, fieldColAttrs)
})
</script>
