import Vue from 'vue'
import uuidv4 from 'uuid/v4'

const state = {
	all: {},
	allIds: [],
	allMsgIds: [],
  currentId: null
}

const mutations = {
  SET_CURRENT_ID (state, { id }) {
    state.currentId = id
  },

	SET_CONVERSATION (state, { conversation }) {
		const data = conversation.data()
		state.all = {...state.all, [conversation.id]: { users: data.users, created: data.created, messages: [] }} 

    if (state.allIds.includes(conversation.id) === false)
      state.allIds.push(conversation.id)
	},

	ADD_MESSAGE (state, { conversationId, message }) {
		if (!state.allMsgIds.includes(message.id)) {
			state.all[conversationId].messages.push(message)
			state.allMsgIds.push(message.id)
		}
	}
}

const actions = {	
  async getMostRecent ({ state, rootState, commit }) {

  },

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
      const x = conversations[c]

      const conversation = await convoRef.doc(x).get()
      const data = conversation.data()
      commit('SET_CONVERSATION', { conversation })

      if (conversation.data().users.includes(user.id)) {
        found = true
        commit('SET_CURRENT_ID', { id: conversation.id })
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

      commit('SET_CURRENT_ID', { id: newConvo.id })
    }
  },

	async get ({ commit, rootState }) {
		let convoRef = rootState.db.collection('conversations')
		let convos = await convoRef.get()

		convos.forEach(conversation => commit('SET_CONVERSATION', { conversation }))
	},
	
	seed ({ rootState }) {
		// let convoRef = rootState.db.collection('conversations')
	}
}

export const getters = {
  currentConversation: state => {
    return state.all[state.currentId]
  }
}

export default { namespaced: true, state, mutations, actions, getters }
