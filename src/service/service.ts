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

// export interface ServiceConfig {}

export const createService = (
  axiosConfig?: AxiosRequestConfig
  // config?: ServiceConfig
) => {
  // 创建实例
  const instance = axios.create(axiosConfig)

  // 使用拦截器
  const useInterceptors = (data: ServiceInterceptors[]) => {
    data.forEach((item) => {
      instance.interceptors.request.use(
        item.requestInterceptor,
        item.requestInterceptorCatch
      )
      instance.interceptors.response.use(
        item.responseInterceptor,
        item.responseInterceptorCatch
      )
    })
  }

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
    instance,
    request,
    useInterceptors
  }
}
