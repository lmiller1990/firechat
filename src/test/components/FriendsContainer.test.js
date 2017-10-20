import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'vue-test-utils'
import SidebarFriendsContainer from '@/components/chat/sidebar/SidebarFriendsContainer'
Vue.use(Vuex)

describe('FriendsContainer', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        users: {
          namespaced: true,
          state: {
            all: {
              '0': { id: 'def' }, '1': { id: 'abc' }
            },
          },
          getters: {
            allUserIdsExceptCurrent: () => ['0', '1']
          }
        }
      }
    })
  })

  it('renders a list of friends', () => {
    const wrapper = shallow(SidebarFriendsContainer, {
      store,
      stubs: {
        SidebarUserItem: '<SidebarUserItem />'
      }
    })

    console.log(wrapper.html())
    expect(wrapper.html().includes('sidebaruseritem')).toBe(true)

  })
})
