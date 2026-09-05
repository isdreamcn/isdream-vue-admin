import type { FormProps } from '../form'
import type { InjectionKey, Ref } from 'vue'
import { watch, ref } from 'vue'
import { cloneDeep } from '@/utils'

// MForm 向字段级子组件（renderItem）注入内部表单数据的 key：
// 传 ref 本身（formData.value 会被整体替换），子组件内按属性建立响应式依赖
export const formDataKey: InjectionKey<Ref<Record<string, any>>> =
  Symbol('m-form-data')

/**
 * MForm 内部表单数据管理：由 fields 构建数据骨架（隐藏字段也保留 key），
 * 外部 modelValue 赋值视为回显/默认值，同时刷新重置基准 initialFormData
 */
export const useFormData = (props: FormProps) => {
  const formData = ref<Record<string, any>>({})
  // 重置基准：最近一次外部（modelValue）真实赋值的快照，
  // 重置时全部字段（含隐藏字段）恢复到此值，未出现过的 key 恢复为 undefined
  const initialFormData = ref<Record<string, any>>({})

  // 从全部字段（含隐藏字段）构建 formData，避免编辑回显丢 key；
  // 隐藏字段数据是否清除/回传由 filterHidden 决定
  // （见 form.vue 的 showFieldKeys watch 与 getSubmitData）
  watch(
    () => props.fields,
    (fields) => {
      const _formData: Record<string, any> = {}
      fields.forEach(
        (field) => (_formData[field.key] = formData.value[field.key])
      )
      // fields 之外的 key（来自外部 modelValue）原样保留，filter=false 时随全量回传
      for (const [key, value] of Object.entries(formData.value)) {
        if (!(key in _formData)) {
          _formData[key] = value
        }
      }
      formData.value = _formData
    },
    {
      immediate: true,
      deep: true
    }
  )

  // 默认值
  watch(
    () => props.modelValue,
    (val) => {
      if (!val || val === formData.value) return

      const _val = cloneDeep(val)
      const modelKeys = Object.keys(_val)

      // v-model 回写的数据与内部一致（key 为子集且值全等，含裁剪版回传）时跳过，
      // 避免回写走赋值分支刷新重置基准；外部真实赋值必然带来值变化或新 key
      if (
        modelKeys.every(
          (key) => key in formData.value && formData.value[key] === _val[key]
        )
      ) {
        return
      }

      // 全量写入：fields 之外的 key 也纳入 formData，保证 filter=false 时不丢数据
      for (const key of modelKeys) {
        formData.value[key] = _val[key]
      }
      // 外部真实赋值（回显/默认值）视为新的重置基准
      initialFormData.value = cloneDeep(formData.value)
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    formData,
    initialFormData
  }
}
