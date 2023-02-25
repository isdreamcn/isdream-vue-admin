import type { FormProps } from '../form'
import type { FormRules, FormItemRule } from 'element-plus'
import type { Ref } from 'vue'
import { computed } from 'vue'

export const useFormRules = (showFields: Ref<FormProps['fields']>) => {
  const formRules = computed(() => {
    const formRules: FormRules = {}

    showFields.value.forEach((field) => {
      const validateRules: FormItemRule[] = []
      if (field.required) {
        validateRules.push({
          required: true,
          message: `请填写${field.label}`,
          trigger: 'blur'
        })
      }
      if (field.validateRules) {
        validateRules.push(...field.validateRules)
      }

      formRules[field.key] = validateRules
    })
    return formRules
  })

  return {
    formRules
  }
}
