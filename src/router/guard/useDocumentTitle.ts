import type { Router } from 'vue-router'
import { setDocumentTitle } from '@/utils'

export const useDocumentTitle = (router: Router) => {
  router.afterEach((to) => {
    setDocumentTitle(to.meta.title)
  })
}
