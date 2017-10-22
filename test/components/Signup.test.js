import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'vue-test-utils'

import Signup from '@/components/home/Signup'

describe('Signup', () => {
  it('renders', () => {
    const wrapper = shallow(Signup)
  })
})
