import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
	all: {},
	allIds: [],
  currentId: null
}

const mutations = {
  SET_CURRENT_ID (state, { id }) {
    state.currentId = id
  },

	SET_CONVERSATION (state, { conversation }) {
		const data = conversation.data()
		state.all = {...state.all, [conversation.id]: { users: data.users, created: data.created }} 

    if (state.allIds.includes(conversation.id) === false)
      state.allIds.push(conversation.id)
	},
}

const actions = {	
	sendMessage ({ commit, rootState }, { text, created, sender, conversationId }) {
		const convoRef = rootState.db.collection('conversations').doc(conversationId)

		convoRef.update({
			messages: [...state.all[conversationId].messages, { id: uuidv4(), created, sender, text }]
		})
		.then(res => console.log('Message sent.'))
		.catch(err => console.log('Error', err))
	},
	
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

	async get ({ commit, rootState }) {
		let convoRef = rootState.db.collection('conversations')
		let convos = await convoRef.get()

		convos.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
	},
}

export const getters = {
  currentConversation: state => {
    return state.all[state.currentId]
  }
}

export default { namespaced: true, state, mutations, actions, getters }
