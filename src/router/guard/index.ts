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

const useGuard = (router: Router) => {
  queueMicrotask(() =>
    useGuards.forEach((useGuardItem) => useGuardItem(router))
  )
}

export default useGuard
