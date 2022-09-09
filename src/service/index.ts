import { BasicRequest } from './basicRequest'
import config from '@/config'

import { useHandleUrl, useSetupToken } from './interceptors'
import { mergeInterceptors } from './utils'

export const service = new BasicRequest({
  baseURL: config.useMock || import.meta.env.DEV ? '/' : config.baseUrlApi,
  interceptors: mergeInterceptors([
    useHandleUrl(config.useMock),
    useSetupToken(config.serviceTokenConfig)
  ])
})

export default service

export * from './types'
