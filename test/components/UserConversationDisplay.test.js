import { mount, shallow } from 'vue-test-utils'
import SidebarUserItem from '@/components/chat/sidebar/SidebarUserItem'
import moment from 'moment'

describe('UserConversationDisplay', () => {
  it('displays a name of a user', () => {
    const mockUser = {
      displayname: 'Testo',
      lastSeen: new Date()
    }

    const wrapper = mount(SidebarUserItem, { 
      mocks: {
        $moment: moment
      },
      propsData: {
        user: mockUser
      }
    })
    
    expect(wrapper.html().includes(mockUser.displayname)).toBe(true)
  })

  it('dispatches a createOrFetchConversation actions when clicked', () => {
    //const wrapper = mount(UserConversationDisplay)
  })
})
