<template>
  <div>
		<Signin />
		<Signup />
    <FriendsContainer />
    <CurrentConversationContainer />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Signin from '@/components/Signin.vue'
import FriendsContainer from '@/components/FriendsContainer.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'app',
  
	components: {
		Signin,
    Signup,
    FriendsContainer,
    CurrentConversationContainer
	}
}
</script>

<style>
</style>
