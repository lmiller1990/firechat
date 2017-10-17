<template>
  <div class="main-container">
    <div class="main-section friends" v-if="$store.state.users.currentUser">

      <div class="buttons">
        <button 
          @click="showFriendsContainer = true" 
          class="fire-menu-button">
          Friends
        </button>

        <button 
          @click="showFriendsContainer = false" 
          class="fire-menu-button">
          Conversations
        </button>
      </div>

      <SidebarFriendsContainer 
        v-show="showFriendsContainer"
      />

      <SidebarConversationsContainer 
        v-show="!showFriendsContainer" 
      />
    </div>

    <div class="main-section conversation">
      <CurrentConversationContainer v-if="currentConversation"/>
    </div>

    <div class="main-section placeholder">
      <Profile />
    </div>
  </div>
</template>

<script>
  import CurrentConversationContainer from './CurrentConversationContainer.vue'
  import Profile from './Profile.vue'

  import SidebarFriendsContainer from './sidebar/SidebarFriendsContainer.vue'
  import SidebarConversationsContainer from './sidebar/SidebarConversationsContainer.vue'

  export default {
    name: 'Chat',

    components: {
      SidebarConversationsContainer,
      SidebarFriendsContainer,
      CurrentConversationContainer,
      Profile
    },

    data () {
      return {
        showFriendsContainer: false
      }
    },

    computed: {
      currentConversation () {
        return this.$store.getters['conversations/currentConversation']
      }
    },

    created () {
      // users - only load one.
      this.$store.dispatch('users/getMostRecent')

      this.$store.state.db.collection('users').doc(this.$store.state.users.currentUser.uid)
        .onSnapshot(snapshot => {
          let conversations = snapshot.data().conversations

          // add new conversations
          for (let c in conversations) {
            if (this.$store.state.conversations.allIds.includes(conversations[c]) === false)
              this.$store.dispatch('conversations/fetchById', { id: conversations[c] })
          }
        })
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

.buttons {
  display: flex;
}

.fire-menu-button {
  width: 50%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 2px;
  padding-right: 2px;
  margin: 2px;
  font-size: 12px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid rgba(255, 0, 0, 0.8);
  color: rgba(255, 0, 0, 0.8);
}
</style>
