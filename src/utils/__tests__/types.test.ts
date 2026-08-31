import { isEmpty, isPropAbsent, isImageByExtname, isElement } from '../types'

describe('isEmpty', () => {
  it('null 返回 true', () => {
    expect(isEmpty(null)).toBe(true)
  })

  it('空字符串返回 true', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('0 返回 false', () => {
    expect(isEmpty(0)).toBe(false)
  })

  it('空数组返回 true', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('非空数组返回 false', () => {
    expect(isEmpty([1, 2])).toBe(false)
  })

  it('空对象返回 true', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('非空对象返回 false', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
  })
})

describe('isPropAbsent', () => {
  it('null 返回 true', () => {
    expect(isPropAbsent(null)).toBe(true)
  })

  it('undefined 返回 true', () => {
    expect(isPropAbsent(undefined)).toBe(true)
  })

  it('空字符串返回 false', () => {
    expect(isPropAbsent('')).toBe(false)
  })

  it('0 返回 false', () => {
    expect(isPropAbsent(0)).toBe(false)
  })
})

describe('isImageByExtname', () => {
  it('识别 .jpg', () => {
    expect(isImageByExtname('photo.jpg')).toBe(true)
  })

  it('识别 .png', () => {
    expect(isImageByExtname('icon.png')).toBe(true)
  })

  it('识别 .svg', () => {
    expect(isImageByExtname('logo.svg')).toBe(true)
  })

  it('拒绝 .pdf', () => {
    expect(isImageByExtname('doc.pdf')).toBe(false)
  })

  it('大小写不敏感', () => {
    expect(isImageByExtname('photo.JPG')).toBe(true)
  })
})

describe('isElement', () => {
  it('DOM 元素返回 true', () => {
    const div = document.createElement('div')
    expect(isElement(div)).toBe(true)
  })

  it('文本节点返回 false', () => {
    const text = document.createTextNode('hello')
    expect(isElement(text)).toBe(false)
  })

  it('普通对象返回 false', () => {
    expect(isElement({})).toBe(false)
  })

  it('null 返回 false', () => {
    expect(isElement(null)).toBe(false)
  })
})
