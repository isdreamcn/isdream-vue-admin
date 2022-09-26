import type { Router } from 'vue-router'
import { nextTick } from 'vue'
import { useHasToken } from './useHasToken'
import { useKeepAlive } from './useKeepAlive'
import { useRouteHistory } from './useRouteHistory'

const useGuards = [useHasToken, useKeepAlive, useRouteHistory]

const useGuard = (router: Router) => {
  nextTick(() => useGuards.forEach((useGuard) => useGuard(router)))
}

export default useGuard
