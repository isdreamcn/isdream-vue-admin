import type { AxiosRequestConfig } from '../types'

import appConfig from '@/config'

export const requestHandleUrl = (config: AxiosRequestConfig) => {
  if (!appConfig.useMock && config.url) {
    config.url = config.url.replace(/^\/api\//, '')
  }
  return config
}
