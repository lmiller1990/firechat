import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
	all: {},
	allIds: [],
  userConversationIds: [],
  currentId: null
}

const mutations = {
  ADD_USER_CONVERSATION (state, { conversationId }) {
    if (!state.userConversationIds.includes(conversationId))
      state.userConversationIds.push(conversationId)
  },

  SET_CURRENT_ID (state, { id }) {
    state.currentId = id
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
  async createOrFetchConversation ({ state, rootState, commit }, { user }) {
    // get current user
    const currentUser = rootState.users.currentUser

    // get references to documents in Firestore
    let convoRef = rootState.db.collection('conversations')
    let userRef = rootState.db.collection('users')

    // ref to current user all convos
    const currentUserConvos = await userRef.doc(currentUser.uid).get()

    // ref to the friend convos - we will need to creat and add a ref. to both if it doesn't exist.
    const friendsConvos = await userRef.doc(user.id).get()

    // actual convos for current user
    const conversations = currentUserConvos.data().conversations

    let found = false

    for (let c in conversations) {
      const conversationId = conversations[c]

      const conversation = await convoRef.doc(conversationId).get()
      const data = conversation.data()

      if (state.allIds.includes(conversation.id) === false)
        commit('SET_CONVERSATION', { conversation })
      
      for (let m in data.messages) {
        commit('messages/ADD_MESSAGE', { conversationId, message: data.messages[m] }, { root: true })
      }

      if (conversation.data().users.includes(user.id)) {
        found = true
        commit('SET_CURRENT_ID', { id: conversationId })
      }
    }

    if (found === false) {
      const newConvo = await convoRef.add({
        created: Date.now(),
        mostRecentMessage: null,
        messages: [],
        users: [user.id, currentUser.uid]
      })

      userRef.doc(currentUser.uid).update({ 
        lastSeen: Date.now(), 
        conversations: [...conversations, newConvo.id]
      })

      const friendsData = friendsConvos.data()

      userRef.doc(user.id).update({ 
        lastSeen: Date.now(), 
        conversations: [...friendsData.conversations, newConvo.id]
      })
      
      const fetchNewConvo = await convoRef.doc(newConvo.id).get()

      commit('SET_CONVERSATION', { conversation: fetchNewConvo })
      commit('SET_CURRENT_ID', { id: newConvo.id })
    }
  },

  async getCurrentUserConversations ({ rootState, commit }) {
    const convoRef = rootState.db.collection('conversations')
    const userRef = rootState.db.collection('users')

    const user = await userRef.doc(rootState.users.currentUser.uid).get()

    user.data().conversations
      .forEach(async conversationId => {
        const conversation = await convoRef.doc(conversationId).get()

        commit('ADD_USER_CONVERSATION', { conversationId })
        commit('SET_CONVERSATION', { conversation })

        conversation.data().messages.forEach(message => {
          commit('messages/ADD_MESSAGE', { 
            conversationId, 
            message,
          }, { root: true })
        })
      })
  }
}

export const getters = {
  currentConversation: state => {
    return state.all[state.currentId]
  },
}

export default { namespaced: true, state, mutations, actions, getters }
