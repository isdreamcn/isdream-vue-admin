import type { ServiceInterceptors } from '../service'
import { useUserStore } from '@/store'

type ServiceTokenPosition = 'headers' | 'params' | 'data'

export interface ServiceTokenConfig {
  position: ServiceTokenPosition
  key: string
  /** 注入值模板，其中的 'TOKEN' 占位符会被实际 token 替换，如 'Bearer TOKEN' */
  value: string
  /** token 写入 storage 时的过期时长（毫秒） */
  expires?: number
}

/** 请求拦截器：将用户 token 按配置注入 headers / params / data */
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
