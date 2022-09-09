import type { RequestInterceptors } from '../types'

type ServiceTokenPosition = 'headers' | 'params' | 'data'

export interface ServiceTokenConfig {
  position: ServiceTokenPosition
  key: string
  value: string
  expires?: number
}

export const useSetupToken = (
  appConfig: ServiceTokenConfig
): RequestInterceptors => {
  const { position, key, value } = appConfig

  return {
    requestInterceptor(config) {
      if (!config[position]) {
        config[position] = {}
      }

      // config[position][key] = value.replace('TOKEN', '123456789')
      return config
    }
  }
}
