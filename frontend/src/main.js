import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://127.0.0.1:3000/api'
Vue.http.options.emulateJSON = true

Vue.filter('phone', (value) => {
  return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
})

const router = new VueRouter({
  mode: 'history',
  routes
})

export const eventBus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
