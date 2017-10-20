import { 
  mutations,
  getters 
} from '@/store/messages'

describe('messages mutations', () => {
  it('adds a message to the state id by with relevant conversation id', () => {
    const state = {
      all: {},
      allIds: []
    }
    
    const message = {
      id: 'abc',
      sender: 'def',
      text: 'New text!'
    }

    mutations.ADD_MESSAGE(state, { conversationId: '1', message })

    expect(state.all['abc']).toEqual({...message, conversationId: '1'})
    expect(state.allIds).toEqual(['abc'])
  })
})

describe('message getters', () => {
  it ('gets all messages for a specified conversation id', () => {
    const state = {
      all: { 
        'a': { conversationId: '1' },
        'b': { conversationId: '2' }
      },
      allIds: ['a', 'b']
    }

    const actual = getters.messageIdsByConversation(state)('1')

    expect(actual).toEqual(['a'])
  })
})

