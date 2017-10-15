<template>
    <div class="main-container">

      <div class="main-section friends">
        <FriendsContainer />
      </div>

      <div class="main-section conversation">
        <CurrentConversationContainer />
      </div>

      <div class="main-section utils">
        <Signin />
        <Signup />
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
  /*height: 600px;*/
  height: 90vh;
}

.main-section {
  border: 1px solid grey;
  height: 100%;
  flex: 1;
}

.friends {
}

.conversation {
  align-self: flex-end
}

.utils {
}
</style>
