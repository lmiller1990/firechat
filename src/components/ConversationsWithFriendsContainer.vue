<template>
  <div>
    <Conversation v-for="id in conversationIds" :id="id" :key="id" />
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
        conversationIds: state => state.conversations.allIds,
      }),
    },
  }
</script>

<style scoped>
</style>
