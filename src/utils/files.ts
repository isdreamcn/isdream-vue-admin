import { isArray } from './plugins'

/**
 * 聚合 import.meta.glob 导入的模块，收集各模块 default 导出为数组
 * （default 为数组时会展开合并）
 */
export const loadFiles = <T>(
  modules: Record<
    string,
    {
      default?: T[] | T
    }
  >
) => {
  const result: T[] = []
  for (const module of Object.values(modules)) {
    const moduleDefault = module.default
    if (moduleDefault === undefined) continue
    if (isArray(moduleDefault)) {
      result.push(...moduleDefault)
    } else {
      result.push(moduleDefault)
    }
  }
  return result
}
