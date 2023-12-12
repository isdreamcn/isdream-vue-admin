import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

type onFulfilled<T> = (value: T) => T | Promise<T>
type onRejected = (error: any) => any

export interface ServiceInterceptors<T = any> {
  requestInterceptor?: onFulfilled<AxiosRequestConfig<any>>
  requestInterceptorCatch?: onRejected
  responseInterceptor?: onFulfilled<AxiosResponse<T, any>>
  responseInterceptorCatch?: onRejected
}

export interface ServiceConfig<T = any> {
  interceptors?: ServiceInterceptors<T>[]
}

export const useService = (
  axiosConfig?: AxiosRequestConfig,
  config?: ServiceConfig
) => {
  // 创建实例
  const instance = axios.create(axiosConfig)

  // 使用拦截器
  config?.interceptors?.forEach(
    ({
      requestInterceptor,
      requestInterceptorCatch,
      responseInterceptor,
      responseInterceptorCatch
    }) => {
      instance.interceptors.request.use(
        requestInterceptor,
        requestInterceptorCatch
      )
      instance.interceptors.response.use(
        responseInterceptor,
        responseInterceptorCatch
      )
    }
  )

  /**
   * 函数说明
   * @param T 返回数据的类型
   */
  const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      instance
        .request<T>(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.response.data)
        })
    })
  }

  return {
    request
  }
}
