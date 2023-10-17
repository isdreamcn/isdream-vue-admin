import { dependencies } from '../package.json'

const stringToBoolean = (str: string) => str === 'true'

// 处理env
export const wrapperLoadViteEnv = <T extends LoadViteEnv>(env: T): ViteEnv => {
  return {
    ...env,
    VITE_USE_MOCK: stringToBoolean(env.VITE_USE_MOCK),
    VITE_BUILD_GZIP: stringToBoolean(env.VITE_BUILD_GZIP),
    VITE_BUILD_ROLLUP_VISUALIZER: stringToBoolean(
      env.VITE_BUILD_ROLLUP_VISUALIZER
    ),
    VITE_BUILD_LEGACY: stringToBoolean(env.VITE_BUILD_LEGACY)
  }
}

export const dependenciesChunks = (ignores: string[] = []) => {
  const chunks: any = {}
  Object.keys(dependencies).forEach((key) => {
    if (ignores.includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}
