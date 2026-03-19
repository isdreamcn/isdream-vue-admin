import { createApp } from 'vue'
import App from './App.vue'
import { setupAppPlugins } from '@/plugins'
import './assets/styles/global.scss'

const bootstrap = async () => {
  const app = createApp(App)

  if (import.meta.env.VITE_USE_MOCK) {
    const { worker } = await import('@/mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass'
    })
  }

  // 注册插件、全局组件、方法
  app.use(setupAppPlugins)

  app.mount('#app')
}

bootstrap()
