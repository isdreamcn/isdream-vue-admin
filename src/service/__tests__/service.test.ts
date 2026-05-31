import { createService } from '../service'

const createMockAdapter = (responseData: any) => (config: any) =>
  Promise.resolve({
    data: responseData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  })

const createErrorAdapter = (error: any) => () => Promise.reject(error)

describe('createService', () => {
  it('返回值包含 instance, request, requestNotHandle, useInterceptors', () => {
    const service = createService()
    expect(service).toHaveProperty('instance')
    expect(service).toHaveProperty('request')
    expect(service).toHaveProperty('requestNotHandle')
    expect(service).toHaveProperty('useInterceptors')
  })

  it('instance 是 Axios 实例', () => {
    const service = createService()
    expect(typeof service.instance.request).toBe('function')
    expect(typeof service.instance.get).toBe('function')
    expect(typeof service.instance.post).toBe('function')
  })

  it('传入 baseURL 后 instance.defaults.baseURL 等于该值', () => {
    const service = createService({ baseURL: 'https://api.example.com' })
    expect(service.instance.defaults.baseURL).toBe('https://api.example.com')
  })

  it('不传参数时 instance.defaults.baseURL 为 undefined', () => {
    const service = createService()
    expect(service.instance.defaults.baseURL).toBeUndefined()
  })

  it('request 调用成功时返回 res.data', async () => {
    const body = { code: 0, message: 'ok', data: { id: 1 } }
    const service = createService({ adapter: createMockAdapter(body) })
    const result = await service.request({ url: '/test' })
    expect(result).toEqual(body)
  })

  it('request 调用失败时 reject 原始错误', async () => {
    const error = new Error('network')
    const service = createService({ adapter: createErrorAdapter(error) })
    await expect(service.request({ url: '/test' })).rejects.toThrow('network')
  })

  it('requestNotHandle 调用成功时返回完整 AxiosResponse', async () => {
    const body = { code: 0, data: {} }
    const service = createService({ adapter: createMockAdapter(body) })
    const result = await service.requestNotHandle({ url: '/test' })
    expect(result.data).toEqual(body)
    expect(result.status).toBe(200)
    expect(result.statusText).toBe('OK')
  })

  it('requestNotHandle 调用失败时 reject 原始错误', async () => {
    const error = new Error('timeout')
    const service = createService({ adapter: createErrorAdapter(error) })
    await expect(service.requestNotHandle({ url: '/test' })).rejects.toThrow(
      'timeout'
    )
  })

  it('useInterceptors 注册 request 拦截器后 config 经过拦截器处理', async () => {
    const body = { code: 0 }
    const service = createService({ adapter: createMockAdapter(body) })
    service.useInterceptors([
      {
        requestInterceptor: (config) => {
          config.headers = config.headers || {}
          config.headers.set('X-Custom', 'hello')
          return config
        }
      }
    ])
    const result = await service.requestNotHandle({ url: '/test' })
    expect(result.config.headers).toMatchObject({ 'X-Custom': 'hello' })
  })

  it('useInterceptors 注册 response 拦截器后 response 经过拦截器处理', async () => {
    const body = { code: 0 }
    const service = createService({ adapter: createMockAdapter(body) })
    service.useInterceptors([
      {
        responseInterceptor: (response) => {
          response.data = { ...response.data, injected: true }
          return response
        }
      }
    ])
    const result = await service.request({ url: '/test' })
    expect(result).toEqual({ code: 0, injected: true })
  })

  it('useInterceptors 注册 responseInterceptorCatch 后错误经过拦截器处理', async () => {
    const originalError = new Error('fail')
    const normalizedError = { code: 1001, message: 'handled' }
    const service = createService()
    service.useInterceptors([
      {
        responseInterceptorCatch: () => Promise.reject(normalizedError)
      }
    ])
    service.instance.defaults.adapter = createErrorAdapter(originalError)
    await expect(service.request({ url: '/test' })).rejects.toEqual(
      normalizedError
    )
  })

  it('拦截器数组为空时不报错', () => {
    const service = createService()
    expect(() => service.useInterceptors([])).not.toThrow()
  })
})
