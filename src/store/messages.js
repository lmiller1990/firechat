import * as types from './mutation-types'

import uuidv4 from 'uuid/v4'
const state = {
  all: {},
	allIds: []
}

const m = '[Message Store]:'

export const mutations = {
  [types.RESET_MESSAGE_STORE] (state) {
    console.log('[Message Store]: Resetting')
    state.all = {}
    state.allIds = state.allIds.splice(0)
  },

	ADD_MESSAGE (state, { conversationId, message }) {
		if (!state.allIds.includes(message.id)) {
      state.all = {...state.all, [message.id]: { ...message, conversationId }}
			state.allIds.push(message.id)
		}
	}
}

const actions = {
  async send ({ rootState, commit }, { conversationId, text, sender }) {
    let convoRef = rootState.db.collection('conversations').doc(conversationId)
    let conversation = await convoRef.get()

    const id = uuidv4()

    return convoRef.update({
      mostRecentMessageId: id,
      messages: [
        ...conversation.data().messages, 
        {
          id,
          created: Date.now(),
          sender,
          text
        }
      ]
    })
    .then(() => console.log('[Message Store]: Message Sent.'))
    .catch((e) => console.log('[Message Store]:', e))
  }
}

export const getters = {
  messageIdsByConversation: state => conversationId => {
    return state.allIds.filter(x => state.all[x].conversationId === conversationId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
