<template>
  <div>
    Conversations
    <div v-for="id in conversationIds" @click="enterConversation(id)">
      {{ id }}  wiith {{ conversations[id].users }}
      <br/>
      <br/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ConversationsWithFriendsContainer',

    computed: {
      ...mapState({
        conversations: state => state.conversations.all,
        conversationIds: state => state.conversations.allIds
      })
    },

    methods: {
      enterConversation (id) {
        this.$store.commit('conversations/SET_CURRENT_CONVERSATION_ID', { id })
      }
    }
  }
</script>

<style scoped>
</style>
