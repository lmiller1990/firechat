import { shallow } from 'vue-test-utils'
import Chat from '@/components/chat/Chat'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const firemock = {
  collection: name => ({
    doc: id => ({
      onSnapshot: () => jest.fn()
    })
  })
}

describe('Chat', () => {
  let store
  let state
  let actions

  beforeEach(() => {
    actions = {
      getMostRecent: jest.fn()
    }

    store = new Vuex.Store({
      state: {
        db: firemock,
      },
      modules: {
        users: {
          namespaced: true,
          state: {
            currentUser: {
              uid: 1,
              displayname: 'lachlan'
            }
          },
          actions
        }
      }
    })
  })

  it('renders and dispatches users/getMostRecent', () => {
    const wrapper = shallow(Chat, {
      store,
    })

    expect(actions.getMostRecent.mock.calls.length).toBe(1)
  })
})
