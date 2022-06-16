import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {API} from './api/config'
import axios from 'axios'
axios.defaults.baseURL = API.baseURL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${API.token}`

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
