/// <reference types="vite/client" />

interface DefineEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_USE_MOCK: boolean
  readonly VITE_BASE_URL_API: string
  readonly VITE_BASE_URL_FILE: string
}

// loadEnv(mode, process.cwd()) || import.meta.env
type LoadViteEnv = {
  readonly [P in keyof DefineEnv]: string
}

interface ImportMetaEnv extends LoadViteEnv, {} {}

interface ViteEnv extends DefineEnv, ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
