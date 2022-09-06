import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style/index.scss'

import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
setupStore()
app.use(router)
app.mount('#app')
