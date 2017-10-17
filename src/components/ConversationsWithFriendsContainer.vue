<template>
  <div>
    Conversations
    <Conversation v-for="id in conversationIds" :id="id" :key="id" />
    <br />
    <br />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Conversation from './Conversation.vue'

  export default {
    name: 'ConversationsWithFriendsContainer',

    components: {
      Conversation
    },

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
