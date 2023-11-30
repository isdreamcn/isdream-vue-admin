// mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import { loadFiles } from '@/utils'

export const setupProdMockServer = () => {
  createProdMockServer(
    loadFiles(import.meta.glob('./**/*.ts', { eager: true }))
  )
}

export default setupProdMockServer
