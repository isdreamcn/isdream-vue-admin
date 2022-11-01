import type { Directive } from 'vue'
import type { AppUsePlugin } from '../types'
import { dateFormat } from '@/directives'

export const useDirectives: AppUsePlugin = (app) => {
  const directives: Record<string, Directive> = {
    dateFormat
  }
  for (const [key, directive] of Object.entries(directives)) {
    app.directive(key, directive)
  }
}
