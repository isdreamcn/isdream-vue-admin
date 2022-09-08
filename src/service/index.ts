import type { AxiosRequestConfig } from './types'
import { BasicRequest } from './basicRequest'
import { requestHandleUrl, requestSetupToken } from './interceptors'

import config from '@/config'
import { composeFns } from '@/utils'

export const service = new BasicRequest({
  baseURL: config.useMock ? '/' : config.baseUrlApi,
  interceptors: {
    requestInterceptor: composeFns<AxiosRequestConfig>(
      requestSetupToken,
      requestHandleUrl
    )
  }
})

export default service

export * from './types'
