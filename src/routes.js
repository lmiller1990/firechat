import Home from './components/Home.vue'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Chat from './components/Chat.vue'

export default [
  {
    path: '/',
    component: Home,
    name: 'home',
    children: [
      {
        path: '/signup',
        component: Signup,
        name: 'signup'
      },
      {
        path: '/signin',
        component: Signin,
        name: 'signin'
      }
    ]
  },
  {
    path: '/chat',
    component: Chat,
    name: 'chat'
  }
]
