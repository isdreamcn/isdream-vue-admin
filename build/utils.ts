export const wrapperLoadEnv = (env: LoadViteEnv): DefineEnv => {
  return {
    ...env,
    VITE_USE_MOCK: env.VITE_USE_MOCK === 'true' ? true : false
  }
}
