import type Vditor from 'vditor'
import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import { useAppSetting } from '@/store'

export const useVditorTheme = (vditor?: Ref<Vditor | undefined>) => {
  const { appIsDark } = useAppSetting()

  const theme = {
    theme: computed(() => (appIsDark.value ? 'dark' : 'classic')),
    content: computed(() => (appIsDark.value ? 'dark' : 'light')),
    code: computed(() => (appIsDark.value ? 'dracula' : 'github'))
  }

  watch(
    () => appIsDark.value,
    () => {
      if (vditor?.value) {
        vditor.value.setTheme(
          theme.theme.value,
          theme.content.value,
          theme.code.value
        )
      }
    }
  )

  return {
    vditorTheme: theme
  }
}
