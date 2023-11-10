import type Vditor from 'vditor'
import { computed } from 'vue'
import { useAppSetting } from '@/store'

export const useVditorTheme = () => {
  const { appIsDark } = useAppSetting()

  const theme = {
    theme: computed(() => (appIsDark.value ? 'dark' : 'classic')),
    content: computed(() => (appIsDark.value ? 'dark' : 'light')),
    code: computed(() => (appIsDark.value ? 'dracula' : 'github'))
  }

  const setVditorTheme = (vditor: Nullable<Vditor>) => {
    if (!vditor) return
    vditor.setTheme(theme.theme.value, theme.content.value, theme.code.value)
  }

  return {
    vditorTheme: theme,
    setVditorTheme
  }
}
