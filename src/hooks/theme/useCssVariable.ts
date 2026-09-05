import { ref, watch, onScopeDispose, getCurrentScope } from 'vue'

/** 单向设置根元素 CSS 变量（value 缺省时不做任何修改） */
export const setCssVariable = (key: string, value?: string) => {
  const el = document.documentElement
  if (value !== undefined) {
    el.style.setProperty(key, value)
  }
}

/**
 * 响应式 CSS 变量：读取变量当前值，修改返回的 ref 会写回根元素，
 * 组件作用域内使用时随作用域销毁自动停止 watch
 */
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
