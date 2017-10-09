import { mount } from 'vue-test-utils'
import Signin from '../Signin'

describe('Signin', () => {
	test('it works', () => {
		const wrapper = mount(Signin)
		expect(wrapper.isVueInstance()).toBeTruthy()
	})
})
