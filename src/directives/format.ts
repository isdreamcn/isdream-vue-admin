import type { Directive } from 'vue'
import type { ConfigType } from 'dayjs'
import { dateFormat as dateFormatFn } from '@/utils'

/**
 * 日期格式化指令：按 arg 指定的 dayjs 模板格式化后写入元素文本，
 * value 缺省时回落元素原有文本；`.space` 修饰符会将模板中的 `__` 替换为空格
 * 用法：
 *   const value = '2023-9-18 22:00:00'
 *   v-dateFormat:YYYY-MM-DD="value"          => 2023-9-18
 *   v-dateFormat:YYYY__MM__DD.space="value"  => 2023 09 18
 */
export const dateFormat: Directive<HTMLElement, ConfigType> = (el, binding) => {
  const { value = el.textContent, arg, modifiers } = binding
  if (!value) {
    return
  }

  let template = arg
  if (template && modifiers.space) {
    template = template.replaceAll('__', ' ')
  }

  el.textContent = dateFormatFn(value, template)
}
