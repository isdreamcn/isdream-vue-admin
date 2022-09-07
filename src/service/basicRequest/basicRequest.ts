import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { RequestInterceptors, RequestConfig } from '../types'

export class BasicRequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  constructor(config?: RequestConfig) {
    // 创建实例
    this.instance = axios.create(config)

    // 保存信息
    this.interceptors = config?.interceptors

    // 拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  /**
   * 函数说明
   * @param T 返回数据的类型
   */
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对config处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res.data)
        })
        .catch((err) => {
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }
          reject(err.response?.data)
        })
    })
  }
}

export default BasicRequest
