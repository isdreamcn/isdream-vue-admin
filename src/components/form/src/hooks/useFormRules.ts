import type { FormProps } from '../form'
import type { FormRules } from 'element-plus'
import { computed } from 'vue'

export const useFormRules = (props: FormProps) => {
  const formRules = computed(() => {
    const formRules: FormRules = {}

    props.fields.forEach(
      (field) => (formRules[field.key] = field.validateRules)
    )
    return formRules
  })

  return {
    formRules
  }
}
