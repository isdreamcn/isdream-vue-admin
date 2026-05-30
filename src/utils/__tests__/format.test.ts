import {
  joinBaseUrlFile,
  setBaseUrlFile,
  removeBaseUrlFile,
  dateFormat
} from '../format'

vi.mock(
  import('@/config'),
  () =>
    ({
      appConfig: {
        baseUrlFile: 'http://localhost'
      }
    }) as any
)

describe('joinBaseUrlFile', () => {
  it('空字符串直接返回', () => {
    expect(joinBaseUrlFile('')).toBe('')
  })

  it('blob: 开头的 URL 直接返回', () => {
    expect(joinBaseUrlFile('blob:http://example.com/xxx')).toBe(
      'blob:http://example.com/xxx'
    )
  })

  it('https:// 开头的 URL 直接返回', () => {
    expect(joinBaseUrlFile('https://example.com/img.png')).toBe(
      'https://example.com/img.png'
    )
  })

  it('http:// 开头的 URL 直接返回', () => {
    expect(joinBaseUrlFile('http://example.com/img.png')).toBe(
      'http://example.com/img.png'
    )
  })

  it('// 开头的协议相对 URL 直接返回', () => {
    expect(joinBaseUrlFile('//cdn.example.com/img.png')).toBe(
      '//cdn.example.com/img.png'
    )
  })

  it('相对路径拼接 baseUrlFile', () => {
    expect(joinBaseUrlFile('uploads/img.png')).toBe(
      'http://localhost/uploads/img.png'
    )
  })

  it('以 / 开头的路径去掉前缀斜杠后拼接', () => {
    expect(joinBaseUrlFile('/uploads/img.png')).toBe(
      'http://localhost/uploads/img.png'
    )
  })

  it('以 ./ 开头的路径去掉前缀后拼接', () => {
    expect(joinBaseUrlFile('./uploads/img.png')).toBe(
      'http://localhost/uploads/img.png'
    )
  })

  it('以 ../ 开头的路径去掉前缀后拼接', () => {
    expect(joinBaseUrlFile('../uploads/img.png')).toBe(
      'http://localhost/uploads/img.png'
    )
  })
})

describe('setBaseUrlFile', () => {
  it('替换 Markdown 图片链接', () => {
    const result = setBaseUrlFile('![alt](uploads/img.png)')
    expect(result).toBe('![alt](http://localhost/uploads/img.png)')
  })

  it('替换 HTML img 双引号 src', () => {
    const result = setBaseUrlFile('<img src="uploads/img.png">')
    expect(result).toBe('<img src="http://localhost/uploads/img.png">')
  })

  it('替换 HTML img 单引号 src', () => {
    const result = setBaseUrlFile("<img src='uploads/img.png'>")
    expect(result).toBe("<img src='http://localhost/uploads/img.png'>")
  })

  it('不替换已经是完整 URL 的图片', () => {
    const input = '![img](https://example.com/img.png)'
    expect(setBaseUrlFile(input)).toBe(input)
  })

  it('同时处理 Markdown 和 HTML 图片', () => {
    const result = setBaseUrlFile('![a](a.png)<img src="b.png">')
    expect(result).toContain('http://localhost/a.png')
    expect(result).toContain('http://localhost/b.png')
  })

  it('无匹配内容时原样返回', () => {
    const input = 'Hello world'
    expect(setBaseUrlFile(input)).toBe(input)
  })
})

describe('removeBaseUrlFile', () => {
  it('移除 URL 中的 baseUrlFile 前缀', () => {
    expect(removeBaseUrlFile('http://localhost/uploads/img.png')).toBe(
      '/uploads/img.png'
    )
  })

  it('无 baseUrlFile 时不变', () => {
    expect(removeBaseUrlFile('https://other.com/img.png')).toBe(
      'https://other.com/img.png'
    )
  })

  it('替换所有出现的 baseUrlFile', () => {
    const input = 'http://localhost/a and http://localhost/b'
    expect(removeBaseUrlFile(input)).toBe('/a and /b')
  })
})

describe('dateFormat', () => {
  it('格式化有效日期字符串', () => {
    expect(dateFormat('2024-01-15')).toBe('2024-01-15 00:00:00')
  })

  it('使用自定义模板', () => {
    expect(dateFormat('2024-01-15', 'YYYY/MM/DD')).toBe('2024/01/15')
  })

  it('格式化 Date 对象', () => {
    const date = new Date(2024, 0, 15, 10, 30, 0)
    expect(dateFormat(date)).toContain('2024-01-15')
  })

  it('格式化时间戳', () => {
    const ts = new Date(2024, 0, 15, 10, 30, 0).getTime()
    expect(dateFormat(ts)).toContain('2024-01-15')
  })

  it('Invalid Date 返回原值的字符串形式', () => {
    expect(dateFormat('not-a-date')).toBe('not-a-date')
  })

  it('null 值返回空字符串', () => {
    expect(dateFormat(null as any)).toBe('')
  })

  it('使用默认模板 YYYY-MM-DD HH:mm:ss', () => {
    const date = new Date(2024, 5, 15, 14, 30, 45)
    const result = dateFormat(date)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })
})
