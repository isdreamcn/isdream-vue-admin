import path from 'path'

export const wrapperEnv = (env: LoadViteEnv): ViteEnv => {
  return {
    ...env,
    VITE_USE_MOCK: env.VITE_USE_MOCK === 'true' ? true : false
  }
}
