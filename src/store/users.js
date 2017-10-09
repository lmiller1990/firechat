import * as types from './mutation-types'
import * as firebase from 'firebase'

const state = {
	all: {},
	currentUser: 'mr_b'
}

const mutations = {
	SET_USER (state, { user }) {
		state.all = {...state.all, [user.id]: user.data() }
	}
}

const actions = {
	seed ({ rootState }) {
		let userRef = rootState.db.collection('users')

		userRef.doc('mr_a').set({
			firstName: 'Andy',
			lastName: 'Andyson'
		})

		userRef.doc('mr_b').set({
			firstName: 'Ben',
			lastName: 'Benson'
		})

		userRef.doc('mr_c').set({
			firstName: 'Cee',
			lastName: 'Ceeson'
		})
	},

	async get ({ commit, rootState }) {
		let userRef = rootState.db.collection('users')
		let users = await userRef.get()

		users.forEach(user => commit('SET_USER', { user }))
	},

	async createUser ({ commit }, { username, password }) {
		try {
			const user = await firebase.auth().createUserWithEmailAndPassword(username, password)
		} catch (e) {
			console.log('Error', e)
		}
	},

	async signin ({ commit }, { email, password }) {
		try {
			const response = await firebase.auth().signInWithEmailAndPassword(email, password)
			console.log(response)
		} catch (e) {
			console.log('Error signing in', e)
		}
	} 
}

export default {
	namespaced: true, 
	state, 
	mutations, 
	actions
}

