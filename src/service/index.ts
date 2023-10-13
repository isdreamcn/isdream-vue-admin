import { BasicRequest } from './basicRequest'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'
import { mergeInterceptors } from './utils'

export const service = new BasicRequest({
  baseURL: import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi,
  interceptors: mergeInterceptors([
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
})

export const mockService = new BasicRequest({
  baseURL: '/mockApi/',
  interceptors: mergeInterceptors([
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
})

export default service

export * from './types'
export type { ServiceTokenConfig } from './interceptors/index'
