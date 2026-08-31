import { setActivePinia, createPinia } from 'pinia'
import { checkAuth } from '../methods'

const mockPermissionAuth = vi.fn()

vi.mock(
  import('@/store'),
  () =>
    ({
      useUserStore: vi.fn(() => ({
        permissionAuth: mockPermissionAuth
      }))
    }) as any
)

describe('checkAuth', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockPermissionAuth.mockClear()
  })

  it('有权限时返回 true', () => {
    mockPermissionAuth.mockReturnValue(true)
    expect(checkAuth('admin')).toBe(true)
    expect(mockPermissionAuth).toHaveBeenCalledWith('admin')
  })

  it('无权限时返回 false', () => {
    mockPermissionAuth.mockReturnValue(false)
    expect(checkAuth('admin')).toBe(false)
  })

  it('传入自定义 store 时使用传入的 store', () => {
    const customStore = { permissionAuth: vi.fn().mockReturnValue(true) } as any
    expect(checkAuth('edit', customStore)).toBe(true)
    expect(customStore.permissionAuth).toHaveBeenCalledWith('edit')
  })

  it('不传 store 时使用 useUserStore()', () => {
    mockPermissionAuth.mockReturnValue(true)
    checkAuth('view')
    expect(mockPermissionAuth).toHaveBeenCalledWith('view')
  })
})
