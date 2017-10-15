import { shallow, mount } from 'vue-test-utils'
import Message from '@/components/Message'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Message', () => {
  const store = new Vuex.Store({
    modules: {
      users: {
        namespaced: true,
        state: {
          currentUser: { uid: 'aaa' }
        }
      }
    }
  })

  const mockMessage = {
    sender: 'aaa',
    text: 'Hi'
  }

  it('renders a message', () => {
    const wrapper = mount(Message, {
      store,
      propsData: {
        message: mockMessage
      }
    })

    expect(wrapper.html().includes('Hi')).toBe(true)
  })

  it('sents the message class based on the sender', () => {
    const wrapper = mount(Message, { 
      store,
      propsData: {
        message: mockMessage
      }
    })

    const messageSpan = wrapper.find('span:first-of-type')

    expect(messageSpan.hasClass('my-message')).toBe(true)
  })
})
