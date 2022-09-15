import type { StorageSetOptions } from '@/storage'
import { defineStore } from 'pinia'
import db from '@/storage'

type Theme = 'light' | 'dark'
interface AppState {
  theme: Theme
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light'
  }),
  getters: {},
  actions: {
    setupState() {
      const theme = db.get<string>('theme')
      this.$patch({
        theme: theme === 'dark' ? 'dark' : 'light'
      })
    },
    setState(state: Partial<AppState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      db.setData(state, dbOptions)
    }
  }
})
