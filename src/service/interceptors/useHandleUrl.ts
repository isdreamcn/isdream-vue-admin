import type { RequestInterceptors } from '../types'

export const useHandleUrl = (useMock: boolean): RequestInterceptors => {
  return {
    requestInterceptor(config) {
      if (!useMock && import.meta.env.PROD && config.url) {
        config.url = config.url.replace(/^\/api/, '')
      }
      return config
    }
  }
}
