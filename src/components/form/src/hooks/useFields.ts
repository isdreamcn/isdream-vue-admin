import type { FormProps } from '../form'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { isFunction } from '@/utils'

// 字段是否可见：show 为函数时按表单数据动态判断，否则 show !== false
export const isFieldVisible = (
  field: FormProps['fields'][number],
  formData: Record<string, any>
) => (isFunction(field.show) ? field.show(formData) : field.show !== false)

export const useFields = (
  props: FormProps,
  formData: Ref<Record<string, any>>
) => {
  // 当前展示字段的 key 集合：供提交裁剪、隐藏清除、折叠测量触发使用。
  // 轻量 computed（只产出 key 数组、不参与渲染），随表单数据按属性级依赖重算；
  // 字段的归一化与显隐渲染下沉在 renderItem.vue 中按字段独立计算
  const showFieldKeys = computed(() =>
    props.fields
      .filter((field) => isFieldVisible(field, formData.value))
      .map((field) => field.key)
  )

  return {
    showFieldKeys
  }
}
