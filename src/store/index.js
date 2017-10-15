import Vue from 'vue'
import Vuex from 'vuex'

import 'babel-polyfill'
import firebase from 'firebase'
import 'firebase/firestore'
import config from '../../firebase.config'

import users from './users'
import messages from './messages'
import conversations from './conversations'

firebase.initializeApp(config)

Vue.use(Vuex)
  const state = {
  db: firebase.firestore()
}

const store = new Vuex.Store({
  state,
  modules: {
    users,
    messages,
    conversations
  }
})

window.store = store

export default store
