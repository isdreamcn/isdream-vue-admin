import type { ServiceInterceptors } from '../service'
import { useUserStore } from '@/store'

type ServiceTokenPosition = 'headers' | 'params' | 'data'

export interface ServiceTokenConfig {
  position: ServiceTokenPosition
  key: string
  value: string
  expires?: number
}

export const useSetupToken = (
  appConfig: ServiceTokenConfig
): ServiceInterceptors => {
  const { position, key, value } = appConfig
  return {
    requestInterceptor(config) {
      const token = useUserStore().token
      if (!token) {
        return config
      }
      if (!config[position]) {
        config[position] = {}
      }

      config[position][key] = value.replace('TOKEN', token)
      return config
    }
  }
}
