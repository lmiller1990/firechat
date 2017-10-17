import * as types from './mutation-types'
import * as firebase from 'firebase'

const state = {
  all: {},
  allIds: [],
  currentUser: {
    uid: null,
    email: null
  }
}

export const mutations = {
  SET_USER (state, { uid, email }) {
    state.currentUser.uid = uid
    state.currentUser.email = email
  },

  [types.APPEND_USER] (state, { user }) {
    state.all = {...state.all, [user.id]: {...user, id: user.id} }
    state.allIds.push(user.id)
  }
}

const actions = {
  async get ({ commit, rootState }) {
    let userRef = rootState.db.collection('users')
    let users = await userRef.get()

    users.forEach(user => commit(types.SET_USER, { user }))
  },

  async getMostRecent ({ state, commit, rootState }) {
    const userRef = rootState.db.collection('users')

    const mostRecent = await userRef
      //.orderBy('joined', 'desc')
      //.limit(10)
      .get()

    mostRecent.forEach(u => {
      let userData = u.data()
      commit(types.APPEND_USER, { 
        user: { id: u.id, ...userData }}
      )
    })
  },

  async createUser ({ commit, rootState }, { email, displayname, password }) {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const userRef = rootState.db.collection('users')

      return userRef.doc(user.uid).set({ 
        email, 
        displayname, 
        lastSeen: Date.now(),
        conversations: [],
        joined: Date.now() 
      })
    } catch (e) {
      console.log('Error', e)
    }
  },

  async signin ({ commit, rootState }, { email, password }) {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)

    const userRef = rootState.db.collection('users')
    const { uid } = response

    userRef.doc(uid).update({ email, lastSeen: Date.now() })

    commit(types.SET_USER, { email, uid })
    console.log('Verified Identity. Welcome', email)
  } 
}

export const getters = {
  allUserIdsExceptCurrent: state => {
    return state.allIds.filter(x => x !== state.currentUser.uid)
  }
}

export default {
  namespaced: true, 
  state, 
  mutations, 
  actions,
  getters
}

