import { createService } from './service'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'

export const service = createService({
  baseURL: import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi
})

export const mockService = createService({
  baseURL: '/mockApi/'
})

export const useServiceInterceptors = () => {
  // 共同控制loading
  const loading = useLoading()

  service.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    loading,
    useHandleError()
  ])
  mockService.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    loading,
    useHandleError()
  ])
}

export default service

export type * from './service'
export type { ServiceTokenConfig } from './interceptors/index'
