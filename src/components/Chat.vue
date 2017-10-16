<template>
  <div class="main-container">
    <div class="main-section friends">
      <FriendsContainer />
    </div>

    <div class="main-section conversation">
      <CurrentConversationContainer />
    </div>

    <div class="main-section placeholder">
      <Profile />
    </div>
  </div>
</template>

<script>
  import CurrentConversationContainer from './CurrentConversationContainer.vue'
  import FriendsContainer from './FriendsContainer.vue'
  import Profile from './Profile.vue'

  export default {
    name: 'Chat',
    
    components: {
      FriendsContainer,
      CurrentConversationContainer,
      Profile
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
  border-right: 1px solid silver;
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
