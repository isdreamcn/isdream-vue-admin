import type { AxiosRequestConfig } from 'axios'
import type { RequestInterceptors } from './interceptors'

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}
