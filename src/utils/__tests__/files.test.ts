import { loadFiles } from '../files'

describe('loadFiles', () => {
  it('单个模块的 default 为单个对象时 push 进结果', () => {
    const modules = {
      './a.ts': { default: { name: 'A' } }
    }
    expect(loadFiles(modules)).toEqual([{ name: 'A' }])
  })

  it('default 为数组时展开合并', () => {
    const modules = {
      './a.ts': { default: [{ name: 'A1' }, { name: 'A2' }] }
    }
    expect(loadFiles(modules)).toEqual([{ name: 'A1' }, { name: 'A2' }])
  })

  it('default 为 undefined 时跳过', () => {
    const modules = {
      './a.ts': { default: undefined },
      './b.ts': { default: { name: 'B' } }
    }
    expect(loadFiles(modules)).toEqual([{ name: 'B' }])
  })

  it('混合数组与单个对象的模块', () => {
    const modules = {
      './a.ts': { default: [{ name: 'A1' }, { name: 'A2' }] },
      './b.ts': { default: { name: 'B' } }
    }
    expect(loadFiles(modules)).toEqual([
      { name: 'A1' },
      { name: 'A2' },
      { name: 'B' }
    ])
  })

  it('空 modules 返回空数组', () => {
    expect(loadFiles({})).toEqual([])
  })

  it('所有 default 为 undefined 返回空数组', () => {
    const modules = {
      './a.ts': { default: undefined },
      './b.ts': {}
    }
    expect(loadFiles(modules)).toEqual([])
  })
})
