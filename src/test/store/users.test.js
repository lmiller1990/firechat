import {
  mutations,
  getters
} from '@/store/users'

describe('users module getters', () => {
  it ('returns all user ids except the current user', () => {
    let state = {
      allIds: [1, 2, 3],
      currentUser: { uid: 3 }
    }

    const actual = getters.allUserIdsExceptCurrent(state)

    expect(actual).toEqual([1, 2])
  })
})

describe('users module mutations', () => {
  it('SET_USER assigns a user email and uid', () => {
    let state = {
      currentUser: { email: null, uid: null }
    }

    mutations.SET_USER(state, { email: 'email', uid: 'xyz' })

    expect(state.currentUser.email).toEqual('email')
    expect(state.currentUser.uid).toEqual('xyz')
  })

  it('APPEND_USER adds a user to the `all` and `allIds` array', () => {
    let state = {
      all: {
        '0': {
          email: 'what@what',
          displayname: 'ok'
        }
      }, allIds: [0]
    }
    
    const user = { id: 1, displayname: 'newuser' }
    mutations.APPEND_USER(state, { user })

    expect(state.all).toHaveProperty('1')
    expect(state.all['1'].displayname).toEqual('newuser')
    expect(state.allIds.length).toBe(2)
    expect(state.allIds[1]).toBe(1)
  })
})
