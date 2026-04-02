import { ref, watch, onScopeDispose, getCurrentScope } from 'vue'

export const setCssVariable = (key: string, value?: string) => {
  const el = document.documentElement
  if (value !== undefined) {
    el.style.setProperty(key, value)
  }
}

export const useCssVariable = (key: string, value?: string) => {
  const el = document.documentElement
  if (value !== undefined) {
    el.style.setProperty(key, value)
  }

  // 获取 css 变量
  const cssVariable = ref(getComputedStyle(el).getPropertyValue(key))

  const stopHandle = watch(cssVariable, (newVal) => {
    // 设置 css 变量
    el.style.setProperty(key, newVal)
  })

  // 在组件作用域内自动清理 watcher
  if (getCurrentScope()) {
    onScopeDispose(stopHandle)
  }

  return cssVariable
}
