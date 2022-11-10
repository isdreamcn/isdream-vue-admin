import { dependencies } from '../package.json'

export const wrapperLoadEnv = (env: LoadViteEnv): DefineEnv => {
  return {
    ...env,
    VITE_USE_MOCK: env.VITE_USE_MOCK === 'true' ? true : false
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
