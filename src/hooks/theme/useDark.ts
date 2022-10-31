import { ref } from 'vue'
import { useAppStore } from '@/store/index'

export const useDark = () => {
  const appStore = useAppStore()

  const isDark = ref(appStore.theme === 'dark')

  const htmlEl = document.querySelector('html')

  const toggleDark = () => {
    if (isDark.value) {
      htmlEl?.classList.add('light')
      htmlEl?.classList.remove('dark')
    } else {
      htmlEl?.classList.add('dark')
      htmlEl?.classList.remove('light')
    }

    isDark.value = !isDark.value
    appStore.setState({
      theme: isDark.value ? 'dark' : 'light'
    })
  }

  // 恢复缓存样式
  if (isDark.value) {
    htmlEl?.classList.add('dark')
  } else {
    htmlEl?.classList.add('light')
  }

  return {
    isDark,
    toggleDark
  }
}
