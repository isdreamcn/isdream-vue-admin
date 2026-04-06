import { isArray } from './plugins'

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
