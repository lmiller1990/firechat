import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
  all: {},
  allIds: [],
  currentId: null
}

const mutations = {
  SET_CURRENT_CONVERSATION_ID (state, { id }) {
    state.currentId = id
  },

  ADD_CONVERSATION (state, { id, conversation }) {
    state.all = { ...state.all, [id]: {...conversation } }
    state.allIds.push(id)
  },

  SET_CONVERSATION (state, { conversation }) {
    const data = conversation.data()
    state.all = {
      ...state.all, 
      [conversation.id]: { 
        users: data.users, 
        created: data.created,
        mostRecentMessage: data.mostRecentMessage
      }
    } 

    state.allIds.push(conversation.id)
  },
}

const actions = {	
  /*
    let convoRef = rootState.db.collection('conversations')
    let userRef = rootState.db.collection('users')
    const currentUser = rootState.users.currentUser
    let found = false

    for (let i = 0; i < state.userConversationIds.length; i++) {
      const current = state.all[state.userConversationIds[i]]

      if (current.users.includes(user.id)) {
        // exists - set
        commit('SET_CURRENT_ID', { id: state.userConversationIds[i] })
        found = true
      } 
    } 
// new - create it

    if (found === false) {
      console.log('[Conversations]: Creating new')
// ref to the friend convos - we will need to creat and add a ref. to both if it doesn't exist.
      const newConvo = await convoRef.add({
        created: Date.now(),
        mostRecentMessage: null,
        messages: [],
        users: [user.id, currentUser.uid]
      })

      const created = await convoRef.doc(newConvo.id).get()

// add to current user convos, also update references

      userRef.doc(currentUser.uid).update({ 
        lastSeen: Date.now(), 
        conversations: [...state.userConversationIds, created.id]
      })

      const friendsConvos = await userRef.doc(user.id).get()
      const friendsData = friendsConvos.data()

      userRef.doc(user.id).update({ 
        lastSeen: Date.now(), 
        conversations: [...friendsData.conversations, created.id]
      })

// const fetchNewConvo = await convoRef.doc(newConvo.id).get()

      commit('SET_CONVERSATION', { conversation: created })
      commit('ADD_USER_CONVERSATION', { conversationId: created.id })

      commit('SET_CURRENT_ID', { id: created.id })
    }
  },

  //const userConversations = rootState.users.currentUser

*/
async getCurrentUserConversations ({ rootState, commit }) {
  const convoRef = rootState.db.collection('conversations')

  const currentUserConvoIds = rootState.users.all[rootState.users.currentUser.uid].conversations

  for (let id in currentUserConvoIds) {
    const conversation = await convoRef.doc(currentUserConvoIds[id]).get()

    commit('ADD_CONVERSATION', { 
      id: conversation.id,
      conversation: conversation.data() 
    })
  }
},

  async createOrFetchConversation ({ state, rootState, commit }, { user }) {
    console.log('[Conversations]: Fetching')
    // do we need to create a new convo?
    const currentUser = rootState.users.all[rootState.users.currentUser.uid]
    const currentUserConvos = currentUser.conversations
    let found = false

    for (let i in currentUserConvos) {
      if (state.all[currentUserConvos[i]].users.includes(user.id)) {
        found = true
      }     
    }

    console.log(`Found is ${found}`)

    if (found === false) {
      console.log('Creating')
      // need to create a new one
      // 1. Create conversation. Add both users.
      // 2. Add ref to convo to both users.
      const userRef = rootState.db.collection('users')
      const convoRef = rootState.db.collection('conversations')

      const newConvo = await convoRef.add({
        created: Date.now(),
        messages: [],
        mostRecentMessageId: null,
        users: [user.id, rootState.users.currentUser.uid]
      })

      userRef.doc(user.id).update({
        conversations: [...user.conversations, newConvo.id]
      })

      userRef.doc(rootState.users.currentUser.uid).update({
        conversations: [...currentUser.conversations, newConvo.id]
      })
    }
  }
}

export const getters = {
  currentConversation: state => {
    return state.all[state.currentId]
  },
}

export default { namespaced: true, state, mutations, actions, getters }
