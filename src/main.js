import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import {API} from './api/config'
import axios from 'axios'
axios.defaults.baseURL = API.baseURL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = `Bearer ${API.token}`

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faHandPointRight, faEraser, faTrash, faBackwardFast, faCirclePlus, faCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faHouse, faHandPointRight, faEraser, faTrash, faBackwardFast, faCirclePlus, faCheck)

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('date-picker', Datepicker);

app.mount('#app')
