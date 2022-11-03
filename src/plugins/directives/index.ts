import type { Directive } from 'vue'
import type { AppUsePlugin } from '../types'
import { dateFormat, auth } from '@/directives'

export const useDirectives: AppUsePlugin = (app) => {
  const directives: Record<string, Directive> = {
    dateFormat,
    auth
  }
  for (const [key, directive] of Object.entries(directives)) {
    app.directive(key, directive)
  }
}
