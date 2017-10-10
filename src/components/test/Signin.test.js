import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'vue-test-utils'

import Signin from '../Signin'

Vue.use(Vuex)

describe('Signin', () => {
	let actions
	let store

	beforeEach(() => {
		actions = {
			signin: jest.fn()
		}

		store = new Vuex.Store({ state: {}, modules: { 
			users: { namespaced: true, actions } } 
		})
	})

	it('signin is dispatched when email and password are validated', () => {
		const wrapper = mount(Signin, { store })
		wrapper.find('button').trigger('click')
		expect(actions.signin.mock.calls.length).toBe(0)
	})

	it('dispatches a signin actions when email and password are validated', () => {
		const wrapper = mount(Signin, { store })

		wrapper.setData({ email: 'email@email', password: 'passoword' })

		wrapper.find('button').trigger('click')

		expect(actions.signin.mock.calls.length).toBe(1)
	})
})
