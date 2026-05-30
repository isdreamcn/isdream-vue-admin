import { setDocumentTitle } from '../document'

describe('setDocumentTitle', () => {
  beforeEach(() => {
    document.title = ''
  })

  it('传入 title 时设置 "title | APP_TITLE" 格式', () => {
    vi.stubEnv('VITE_APP_TITLE', 'isdream-vue-admin')
    setDocumentTitle('首页')
    expect(document.title).toBe('首页 | isdream-vue-admin')
  })

  it('不传 title 时仅设置 APP_TITLE', () => {
    vi.stubEnv('VITE_APP_TITLE', 'isdream-vue-admin')
    setDocumentTitle()
    expect(document.title).toBe('isdream-vue-admin')
  })

  it('传入空字符串时仅设置 APP_TITLE', () => {
    vi.stubEnv('VITE_APP_TITLE', 'isdream-vue-admin')
    setDocumentTitle('')
    expect(document.title).toBe('isdream-vue-admin')
  })

  it('不同 APP_TITLE 值正确生效', () => {
    vi.stubEnv('VITE_APP_TITLE', 'MyApp')
    setDocumentTitle('Dashboard')
    expect(document.title).toBe('Dashboard | MyApp')
  })
})
