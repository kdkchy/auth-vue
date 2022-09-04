import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./plugins/axios.js"
import VueAxios from 'vue-axios'

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router);
app.use(store);

app.mount('#app');
