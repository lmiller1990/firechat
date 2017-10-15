<template>
  <div>
		<Signin />
		<Signup />
    <hr>
    
    <div v-if="currentUser.uid" class="main-container">
      <div class="main-section">
        <FriendsContainer />
      </div>
      <div class="main-section">
        <CurrentConversationContainer />
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Signin from './components/Signin.vue'
import CurrentConversationContainer from './components/CurrentConversationContainer.vue'
import FriendsContainer from './components/FriendsContainer.vue'
import Signup from './components/Signup.vue'

export default {
  name: 'app',
  
	components: {
		Signin,
    Signup,
    FriendsContainer,
    CurrentConversationContainer
	},

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
}
.main-section {
  border: 1px solid grey;
}
</style>
