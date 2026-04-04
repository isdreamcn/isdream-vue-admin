import { createService } from './service'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'
// import { useResponseAdapter } from './interceptors'

export const service = createService({
  baseURL: import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi
})

export const mockService = createService({
  baseURL: '/mockApi/'
})

const useServiceInterceptors = () => {
  // 共同控制loading
  const loading = useLoading()

  service.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    loading,
    // 当后端响应格式与 ServiceResponse 不一致时，可使用 useResponseAdapter 进行适配
    // useResponseAdapter((row) => ({
    //   code: row.code,
    //   message: row.message,
    //   data: row.data,
    //   count: row.count
    // })),
    useHandleError()
  ])
  mockService.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    loading,
    useHandleError()
  ])
}

useServiceInterceptors()

export default service

export type * from './service'
export type { ServiceTokenConfig } from './interceptors/index'
