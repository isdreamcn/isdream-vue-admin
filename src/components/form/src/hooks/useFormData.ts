import type { FormProps } from '../form'
import type { Ref } from 'vue'
import { watch, ref } from 'vue'

export const useFormData = (
  props: FormProps,
  showFields: Ref<FormProps['fields']>,
  change: (formData: Record<string, any>) => void = () => {}
) => {
  const formData = ref<Record<string, any>>({})

  watch(
    () => showFields.value,
    (fields) => {
      const _formData: Record<string, any> = {}
      fields.forEach(
        (field) =>
          (_formData[field.key] =
            formData.value[field.key] ??
            (props.modelValue && props.modelValue[field.key]))
      )
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
      if (!val) {
        return
      }
      for (const key of Object.keys(formData.value)) {
        formData.value[key] = val[key]
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  // v-model
  watch(
    () => formData.value,
    () => {
      change({ ...formData.value })
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    formData
  }
}
