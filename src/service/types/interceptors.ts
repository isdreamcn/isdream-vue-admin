import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export type InterceptorCatch<T = any> = (error: T) => T

export type RequestInterceptor = (
  config: AxiosRequestConfig
) => AxiosRequestConfig

export type ResponseInterceptor<T = any> = (
  res: AxiosResponse<T>
) => AxiosResponse<T>

export interface RequestInterceptors<T = any> {
  requestInterceptor?: RequestInterceptor
  requestInterceptorCatch?: InterceptorCatch
  responseInterceptor?: ResponseInterceptor<T>
  responseInterceptorCatch?: InterceptorCatch
}
