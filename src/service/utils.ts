import type {
  RequestInterceptors,
  InterceptorCatch,
  RequestInterceptor,
  ResponseInterceptor
} from './types'

import { composeFns } from '@/utils'

export const mergeInterceptors = (
  requestInterceptors: RequestInterceptors[]
): RequestInterceptors => {
  const requestInterceptorList: RequestInterceptor[] = []
  const requestInterceptorCatchList: InterceptorCatch[] = []
  const responseInterceptorList: ResponseInterceptor[] = []
  const responseInterceptorCatchList: InterceptorCatch[] = []

  for (const interceptors of requestInterceptors) {
    const {
      requestInterceptor,
      requestInterceptorCatch,
      responseInterceptor,
      responseInterceptorCatch
    } = interceptors

    requestInterceptor && requestInterceptorList.push(requestInterceptor)
    requestInterceptorCatch &&
      requestInterceptorCatchList.push(requestInterceptorCatch)
    responseInterceptor && responseInterceptorList.push(responseInterceptor)
    responseInterceptorCatch &&
      responseInterceptorCatchList.push(responseInterceptorCatch)
  }

  return {
    requestInterceptor: composeFns(requestInterceptorList),
    requestInterceptorCatch: composeFns(requestInterceptorCatchList),
    responseInterceptor: composeFns(responseInterceptorList),
    responseInterceptorCatch: composeFns(responseInterceptorCatchList)
  }
}
