import { createApp } from 'vue'
import App from './App.vue'
import { setupAppPlugins } from '@/plugins'
import './assets/styles/global.scss'

const app = createApp(App)

// 注册插件、全局组件、方法
app.use(setupAppPlugins)

app.mount('#app')
