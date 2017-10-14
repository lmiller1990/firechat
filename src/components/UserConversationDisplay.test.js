import { mount, shallow } from 'vue-test-utils'
import UserConversationDisplay from './UserConversationDisplay'
import moment from 'moment'

describe('UserConversationDisplay', () => {
  it('displays a name of a user', () => {
    const mockUser = {
      displayname: 'Testo',
      lastSeen: new Date()
    }

    const wrapper = mount(UserConversationDisplay, { 
      mocks: {
        $moment: moment
      },
      propsData: {
        user: mockUser
      }
    })
  })

  it('dispatches a createOrFetchConversation actions when clicked', () => {
    //const wrapper = mount(UserConversationDisplay)
  })
})
