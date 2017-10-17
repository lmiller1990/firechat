<template>
  <div>
    Conversations
    <div v-for="id in userConversationIds">
      {{ id }}
      {{ messages[conversations[id].mostRecentMessage].text }}
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ConversationsWithFriendsContainer',

    computed: {
      ...mapState({
        messages: state => state.messages.all,
        conversations: state => state.conversations.all,
        userConversationIds: state => state.conversations.userConversationIds
      })
    }
  }
</script>

<style scoped>
</style>
