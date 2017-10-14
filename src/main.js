import Vue from 'vue'
import App from './App.vue'
import store from './store'
import moment from 'moment'

Vue.prototype.$moment = moment

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
