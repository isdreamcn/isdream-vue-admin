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
  service.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
  mockService.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
}

export default service

export type * from './service'
export type { ServiceTokenConfig } from './interceptors/index'
