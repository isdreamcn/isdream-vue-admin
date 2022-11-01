import type { Directive } from 'vue'
import dayjs from 'dayjs'

export const dateFormat: Directive<HTMLElement, any> = {
  created(el, binding) {
    const { value = el.innerText, arg, modifiers } = binding
    if (!value) {
      return
    }

    let template = arg ?? 'YYYY-MM-DD HH:mm:ss'
    if (modifiers.space) {
      template = template.replaceAll('__', ' ')
    }
    el.innerText = dayjs(value).format(template)
  }
}
