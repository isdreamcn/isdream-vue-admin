import type { AxiosRequestConfig } from '../types'
export const requestSetupToken = (config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.token = 123
  }
  console.log(config)
  return config
}
