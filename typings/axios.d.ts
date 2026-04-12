import 'axios'

declare module 'axios' {
  interface InternalAxiosRequestConfig<D = any> {
    // 静默错误：当为 true 时，useHandleError 不会触发全局错误弹窗
    _silentError?: boolean
  }

  interface AxiosRequestConfig<D = any> {
    _silentError?: boolean
  }
}
