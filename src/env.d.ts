/// <reference types="vite/client" />

interface ViteEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_USE_MOCK: boolean
  readonly VITE_BASE_URL_API: string
  readonly VITE_BASE_URL_FILE: string
}

// loadEnv(mode, process.cwd())
type LoadViteEnv = {
  readonly [P in keyof ViteEnv]: string
}

interface ImportMetaEnv extends ViteEnv, {} {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
