import type { RequestInterceptors } from '../types'
import { useUserStore } from '@/store'

type ServiceTokenPosition = 'headers' | 'params' | 'data'

export interface ServiceTokenConfig {
  position: ServiceTokenPosition
  key: string
  value: string
  expires?: number
}

const userStore = useUserStore()
export const useSetupToken = (
  appConfig: ServiceTokenConfig
): RequestInterceptors => {
  const { position, key, value } = appConfig

  return {
    requestInterceptor(config) {
      if (!userStore.token) {
        return config
      }
      if (!config[position]) {
        config[position] = {}
      }

      config[position][key] = value.replace('TOKEN', userStore.token)
      return config
    }
  }
}
