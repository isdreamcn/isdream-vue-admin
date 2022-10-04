import { ref, watch } from 'vue'

const el = document.documentElement
export const useCssVariable = (key: string, value?: string) => {
  if (value) {
    el.style.setProperty(key, value)
  }

  // 获取 css 变量
  const cssVariable = ref(getComputedStyle(el).getPropertyValue(key))

  watch(cssVariable, (newVal) => {
    // 设置 css 变量
    el.style.setProperty(key, newVal)
  })

  return cssVariable
}
