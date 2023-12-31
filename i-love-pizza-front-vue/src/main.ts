import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.config.errorHandler = (err) => {
  console.error('An error occured:', err)
}

app.mount('#app')
