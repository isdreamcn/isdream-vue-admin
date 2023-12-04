import type { Router } from 'vue-router'
import { useHasToken } from './useHasToken'
import { useKeepAlive } from './useKeepAlive'
import { useRouteHistory } from './useRouteHistory'
import { useLoading } from './useLoading'
import { useRedirect } from './useRedirect'
import { useDocumentTitle } from './useDocumentTitle'

const useGuards = [
  useRedirect,
  useLoading,
  useHasToken,
  useKeepAlive,
  useRouteHistory,
  useDocumentTitle
]

export const useRouterGuard = (router: Router) => {
  useGuards.forEach((useGuardItem) => useGuardItem(router))
}
