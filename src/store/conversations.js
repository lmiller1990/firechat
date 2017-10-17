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

  SET_MOST_RECENT_MESSAGE_ID (state, { conversationId, messageId }) {
    state.all[conversationId].mostRecentMessageId = messageId
  },
  
  ADD_CONVERSATION (state, { conversation }) {
    console.log('convesation', conversation)
    state.all = { ...state.all, [conversation.id]: {...conversation } }
    state.allIds.push(conversation.id)
  },
}

const actions = {	
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

  async fetchById ({ state, rootState, commit }, { id }) {
    const convoRef = rootState.db.collection('conversations')
    const fetchedConvo = await convoRef.doc(id).get()

    commit('ADD_CONVERSATION', { 
      conversation: fetchedConvo.data()
    })
  },

  async createOrFetchConversation ({ state, rootState, commit, getters }, { user }) {
    console.log('[Conversations]: Fetching')
    // do we need to create a new convo?
    const currentUser = rootState.users.all[rootState.users.currentUser.uid]
    const currentUserConvos = currentUser.conversations
    let found = false

    if (getters.doesExist(currentUser.id, user.id)) {
      found = true
    }
    console.log(`Found is ${found}`)

    if (found === false) {
      console.log('Creating')
      // need to create a new one
      // 1. Create conversation. Add both users.
      // 2. Add ref to convo to both users.
      const userRef = rootState.db.collection('users')
      const convoRef = rootState.db.collection('conversations')

      const uuid = uuidv4()

      const newConvo = await convoRef.doc(uuid).set({
        id: uuid,
        created: Date.now(),
        messages: [],
        mostRecentMessageId: null,
        users: [user.id, rootState.users.currentUser.uid]
      })

      userRef.doc(user.id).update({
        conversations: [...user.conversations, uuid]
      })

      userRef.doc(rootState.users.currentUser.uid).update({
        conversations: [...currentUser.conversations, uuid]
      })
    }
  }
}

export const getters = {
  currentConversation: state => {
    return state.all[state.currentId]
  },

  doesExist: state => (userId, currentUserId) => {
    console.log('Checking', userId, currentUserId)
    let exists = false
    for (let i in state.allIds) {
      if (
        state.all[state.allIds[i]].users.includes(userId) &&
        state.all[state.allIds[i]].users.includes(currentUserId)
      )
        exists = true
    }
    // return exists

    return state.allIds.filter(x => 
      state.all[x].users.includes(currentUserId) &&
      state.all[x].users.includes(userId)
    ).length > 0
  }
}

export default { namespaced: true, state, mutations, actions, getters }
