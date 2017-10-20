import { getters } from '@/store/conversations'

describe('conversations getters', () => {
  it('returns a current conversation if one exists', () => {
    const state = {
      all: {
        '1': { id: '1' }
      },
      currentId: 1
    }
    
    const actual = getters.currentConversation(state)

    expect(actual).toHaveProperty('id')
    expect(actual.id).toEqual('1')

  })
})
