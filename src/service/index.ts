import { useService } from './service'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'

export const service = useService(
  {
    baseURL: import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi
  },
  {
    interceptors: [
      useSetupToken(config.serviceTokenConfig),
      useLoading(),
      useHandleError()
    ]
  }
)

export const mockService = useService(
  {
    baseURL: '/mockApi/'
  },
  {
    interceptors: [
      useSetupToken(config.serviceTokenConfig),
      useLoading(),
      useHandleError()
    ]
  }
)

export default service

export type * from './service'
export type { ServiceTokenConfig } from './interceptors/index'
