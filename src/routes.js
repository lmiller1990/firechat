import Home from './components/home/Home.vue'
import Signin from './components/home/Signin.vue'
import Signup from './components/home/Signup.vue'
import Chat from './components/chat/Chat.vue'

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
