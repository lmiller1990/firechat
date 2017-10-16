import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'

import App from './App.vue'
import store from './store'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

Vue.prototype.$moment = moment

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
