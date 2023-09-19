import type { Directive } from 'vue'
import { dateFormat as dateFormatFn } from '@/utils'

/*
  const value = '2023-9-18 22:00:00'
  v-dateFormat:YYYY-MM-DD="value" => 2023-9-18
  v-dateFormat:YYYY__MM__DD.space="value" => 2023 09 18
*/
export const dateFormat: Directive<HTMLElement, any> = (el, binding) => {
  const { value = el.innerText, arg, modifiers } = binding
  if (!value) {
    return
  }

  let template = arg
  if (template && modifiers.space) {
    template = template.replaceAll('__', ' ')
  }

  el.innerText = dateFormatFn(value, template)
}
