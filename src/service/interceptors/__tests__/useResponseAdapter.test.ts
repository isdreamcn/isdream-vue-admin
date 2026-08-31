import { useResponseAdapter } from '../useResponseAdapter'

const { mockIsObject, mockIsBlob } = vi.hoisted(() => ({
  mockIsObject: vi.fn(),
  mockIsBlob: vi.fn()
}))

vi.mock(
  import('@/utils/plugins'),
  () =>
    ({
      isObject: mockIsObject,
      isBlob: mockIsBlob
    }) as any
)

describe('useResponseAdapter', () => {
  let adapter: (row: any) => any

  beforeEach(() => {
    adapter = vi.fn((data: any) => ({
      code: 0,
      message: 'ok',
      data: data.value
    }))
    mockIsObject.mockReturnValue(false)
    mockIsBlob.mockReturnValue(false)
  })

  describe('responseInterceptor', () => {
    it('isObject=true 且 isBlob=false 时调用 adapter 转换 res.data', () => {
      const interceptors = useResponseAdapter(adapter)
      const res = { data: { value: 1 } } as any
      mockIsObject.mockReturnValue(true)
      mockIsBlob.mockReturnValue(false)

      interceptors.responseInterceptor!(res)

      expect(adapter).toHaveBeenCalledWith({ value: 1 })
      expect(res.data).toEqual({ code: 0, message: 'ok', data: 1 })
    })

    it('isObject=false 时跳过 adapter，原样返回', () => {
      const interceptors = useResponseAdapter(adapter)
      const res = { data: 'plain' } as any
      mockIsObject.mockReturnValue(false)

      const result = interceptors.responseInterceptor!(res)

      expect(adapter).not.toHaveBeenCalled()
      expect(result).toBe(res)
    })

    it('isBlob=true 时跳过 adapter，原样返回', () => {
      const interceptors = useResponseAdapter(adapter)
      const res = { data: new Blob() } as any
      mockIsObject.mockReturnValue(true)
      mockIsBlob.mockReturnValue(true)

      const result = interceptors.responseInterceptor!(res)

      expect(adapter).not.toHaveBeenCalled()
      expect(result).toBe(res)
    })

    it('adapter 函数接收 res.data 作为参数', () => {
      const interceptors = useResponseAdapter(adapter)
      const original = { value: 'test' }
      const res = { data: original } as any
      mockIsObject.mockReturnValue(true)
      mockIsBlob.mockReturnValue(false)

      interceptors.responseInterceptor!(res)

      expect(adapter).toHaveBeenCalledWith(original)
    })

    it('返回修改后的 response 对象', () => {
      const interceptors = useResponseAdapter(adapter)
      const res = { data: { value: 1 }, status: 200 } as any
      mockIsObject.mockReturnValue(true)
      mockIsBlob.mockReturnValue(false)

      const result = interceptors.responseInterceptor!(res) as any

      expect(result).toBe(res)
      expect(result.status).toBe(200)
    })
  })

  describe('responseInterceptorCatch', () => {
    it('err.response.data 为对象且非 Blob 时调用 adapter', async () => {
      const interceptors = useResponseAdapter(adapter)
      const err = { response: { data: { value: 2 } } } as any
      mockIsObject.mockReturnValue(true)
      mockIsBlob.mockReturnValue(false)

      await expect(interceptors.responseInterceptorCatch!(err)).rejects.toBe(
        err
      )

      expect(adapter).toHaveBeenCalledWith({ value: 2 })
      expect(err.response.data).toEqual({ code: 0, message: 'ok', data: 2 })
    })

    it('err.response 为 undefined 时不报错', async () => {
      const interceptors = useResponseAdapter(adapter)
      const err = {} as any

      await expect(interceptors.responseInterceptorCatch!(err)).rejects.toBe(
        err
      )

      expect(adapter).not.toHaveBeenCalled()
    })

    it('处理后仍然 reject', async () => {
      const interceptors = useResponseAdapter(adapter)
      const err = { response: { data: { value: 3 } } } as any
      mockIsObject.mockReturnValue(true)
      mockIsBlob.mockReturnValue(false)

      await expect(interceptors.responseInterceptorCatch!(err)).rejects.toBe(
        err
      )
    })
  })
})
