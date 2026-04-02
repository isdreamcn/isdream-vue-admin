import { computed } from 'vue'
import { useAppStore } from '@/store/index'

export const applyThemeClass = () => {
  const appStore = useAppStore()
  const htmlEl = document.documentElement
  const isDark = appStore.theme === 'dark'
  htmlEl.classList.remove('dark', 'light')
  htmlEl.classList.add(isDark ? 'dark' : 'light')
}

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
