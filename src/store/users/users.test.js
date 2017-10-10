import {
  mutations
} from './'

describe('users module', () => {
  it('SET_USER assigns a user email and uid', () => {
    let state = {
      currentUser: { email: null, uid: null }
    }

    mutations.SET_USER(state, { email: 'email', uid: 'xyz' })

    expect(state.currentUser.email).toEqual('email')
    expect(state.currentUser.uid).toEqual('xyz')
  })

  it('UPDATE_MOST_RECENT_USERS updates the `all` and `allIds` array', () => {
    let state = {
      all: {}, allIds: []
    }

    // mutations.UPDATE_MOST_RECENT_USERS(state, {  })
  })
})
