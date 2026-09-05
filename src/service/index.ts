import { createService } from './service'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'
// import { useResponseAdapter } from './interceptors'

/** 真实接口实例：dev 环境 baseURL 为 /proxyApi/（代理到 VITE_BASE_URL_API） */
export const service = createService({
  baseURL: import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi
})

/** Mock 接口实例：baseURL 为 /mockApi/，配合 MSW 拦截 */
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
