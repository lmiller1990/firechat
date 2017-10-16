<template>
  <div class="main-container">
    <div class="main-section friends">
      <FriendsContainer />
    </div>

    <div class="main-section conversation">
      <CurrentConversationContainer />
    </div>

    <div class="main-section placeholder">
      {{ '' }}
    </div>
  </div>
</template>

<script>
  import CurrentConversationContainer from './CurrentConversationContainer.vue'
  import FriendsContainer from './FriendsContainer.vue'

  export default {
    name: 'Chat',
    
    created () {
      if (this.$store.state.users.currentUser)
        this.mock()
    },

    methods: {
      mock () {
        console.log('Mock in')
        this.$store.dispatch('users/signin', { email: 'abc@de.com', password: 'password' })
      },
    },

    components: {
      FriendsContainer,
      CurrentConversationContainer
    },
  }
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.main-section {
  border: 1px solid grey;
  height: 100%;
  flex: 1;
}

.friends, .placeholder {
  flex-grow: 1;
}

.conversation {
  align-self: flex-end;
  flex-grow: 2;
}
</style>
