import type { FormProps } from '../form'
import { computed } from 'vue'

export const useFields = (props: FormProps) => {
  const defaultColAttrs = computed(() =>
    typeof props.colAttrs === 'number'
      ? { span: props.colAttrs }
      : props.colAttrs
  )

  // fieldColAttrs
  const getColAttrs = (colAttrs?: FormProps['colAttrs']) => {
    if (!colAttrs) {
      return defaultColAttrs.value
    }
    const fieldColAttrs =
      typeof colAttrs === 'number' ? { span: colAttrs } : colAttrs
    return Object.assign({}, defaultColAttrs.value, fieldColAttrs)
  }

  // 需要显示的fields
  const showFields = computed(() =>
    props.fields.filter((field) => field.show !== false)
  )

  const fields = computed(() =>
    showFields.value.map((field) => {
      return {
        ...field,
        label: field.label ?? field.key,
        colAttrs: getColAttrs(field.colAttrs),
        placeholder: field.attrs?.placeholder ?? field.label ?? field.key
      }
    })
  )

  return {
    fields,
    showFields
  }
}
