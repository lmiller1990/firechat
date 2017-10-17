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
  [types.SET_USER] (state, { uid, email }) {
    state.currentUser.uid = uid
    state.currentUser.email = email
  },

  [types.APPEND_USER] (state, { user }) {
    state.all = {...state.all, [user.id]: {...user, id: user.id} }
    state.allIds.push(user.id)
  }
}

const actions = {
  async getMostRecent ({ state, commit, rootState }) {
    const userRef = rootState.db.collection('users')

    const mostRecent = await userRef.get()

    mostRecent.forEach(u => {
      let userData = u.data()
      if (u.id !== state.currentUser.uid)
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

    commit(types.SET_USER, { email, uid })

    const updated = await userRef.doc(uid).update({ email, lastSeen: Date.now() })
    const user = await userRef.doc(uid).get()

    commit(types.APPEND_USER, { 
      user: {
        id: user.id,
        ...user.data() 
      }
    })
    console.log('Verified Identity. Welcome', email)
  } 
}

export const getters = {
  displaynamesByUserIds: state => userIds => {
    console.log('ids', userIds)
    return userIds.map(x => state.all[x].displayname)
  },

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

