import type { FormProps } from '../form'
import { computed } from 'vue'
import { formComponentMap } from '../components'

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
      const mComponent = formComponentMap.get(field.tag as any)
      return {
        ...field,
        tag: mComponent ?? field.tag,
        label: field.label ?? field.key,
        colAttrs: getColAttrs(field.colAttrs),
        placeholder: field.placeholder ?? field.label ?? field.key
      }
    })
  )

  return {
    fields,
    showFields,
    defaultColAttrs
  }
}
