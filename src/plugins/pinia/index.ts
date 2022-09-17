import type { AppUsePlugin } from '../types'
import { createPinia } from 'pinia'

import { setupStore } from '@/store'

export const usePinia: AppUsePlugin = (app) => {
  const pinia = createPinia()
  app.use(pinia)

  setupStore()
}
