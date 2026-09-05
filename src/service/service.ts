import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

type onFulfilled<T> = (value: T) => T | Promise<T>
type onRejected = (error: any) => any

export interface ServiceError {
  code?: number
  message?: string
  response?: AxiosResponse
}

/** 统一响应结构：code 为业务状态码，200 视为成功 */
export interface ServiceResponse {
  code?: number
  message?: string
  data?: any
  /** 列表数据总数，用于分页 */
  count?: number
}

export interface ServiceInterceptors<T = any> {
  requestInterceptor?: onFulfilled<InternalAxiosRequestConfig<any>>
  requestInterceptorCatch?: onRejected
  responseInterceptor?: onFulfilled<AxiosResponse<T, any>>
  responseInterceptorCatch?: onRejected
}

export const createService = (axiosConfig?: AxiosRequestConfig) => {
  const instance = axios.create(axiosConfig)

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

  /** 发送请求并直接返回响应体（res.data，即 ServiceResponse 结构） */
  const request = <T extends ServiceResponse = any>(
    config: AxiosRequestConfig
  ): Promise<T> => {
    return instance.request<T>(config).then((res) => res.data)
  }

  /**
   * 发送请求并返回完整的 AxiosResponse（不剥离 data）
   * 适用于需要读取 headers、status 等响应信息的场景
   */
  const requestNotHandle = <T = any>(config: AxiosRequestConfig) => {
    return instance.request<T>(config)
  }

  return {
    instance,
    request,
    requestNotHandle,
    useInterceptors
  }
}
