import { computed } from 'vue'
import { useAppStore } from '@/store/index'

export const applyThemeClass = () => {
  const appStore = useAppStore()
  const htmlEl = document.documentElement
  const isDark = appStore.theme === 'dark'
  htmlEl.classList.remove('dark', 'light')
  htmlEl.classList.add(isDark ? 'dark' : 'light')
}

/** 暗色模式开关：isDark 是否暗色，toggleDark 切换主题并持久化 */
export const useDark = () => {
  const appStore = useAppStore()

  const isDark = computed(() => appStore.theme === 'dark')

  const toggleDark = () => {
    const newTheme = isDark.value ? 'light' : 'dark'
    appStore.setState({
      theme: newTheme
    })

    const htmlEl = document.documentElement
    htmlEl.classList.remove('dark', 'light')
    htmlEl.classList.add(newTheme)
  }

  return {
    isDark,
    toggleDark
  }
}
