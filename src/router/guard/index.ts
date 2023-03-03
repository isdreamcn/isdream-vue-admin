import type { Router } from 'vue-router'
import { useHasToken } from './useHasToken'
import { useKeepAlive } from './useKeepAlive'
import { useRouteHistory } from './useRouteHistory'
import { useLoading } from './useLoading'
import { useRedirect } from './useRedirect'

const useGuards = [
  useRedirect,
  useLoading,
  useHasToken,
  useKeepAlive,
  useRouteHistory
]

const useGuard = (router: Router) => {
  queueMicrotask(() =>
    useGuards.forEach((useGuardItem) => useGuardItem(router))
  )
}

export default useGuard
