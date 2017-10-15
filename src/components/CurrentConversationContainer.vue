<template>
  <div class="container">
    <div v-if="currentConversation">
      Conversation: {{ currentConversation }}
    </div>

    <div v-for="id in messageIdsByConversation">
      {{ messages[id] }}
    </div>

    <button @click="send">Send</button>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Message from './Message.vue'

  export default {
    name: 'CurrentConversationContainer',

    components: {
      Message
    },

    methods: {
      send () {
        this.$store.dispatch('messages/send', { 
          conversationId: this.$store.state.conversations.currentId,
          sender: this.$store.state.users.currentUser.uid,
          text: 'New text'
        })
      }
    },

    watch: {
      '$store.state.conversations.currentId' () {
        this.$store.state.db.collection('conversations').doc(this.currentConversationId)
          .onSnapshot(snapshot => {
            let source = snapshot.metadata.hasPendingWrites ? 'Local' : 'Server'
            // TODO: 'Such and such is typing a message' console.log(`Source ${source}`)

            snapshot.data().messages.forEach(message => this.$store.commit('messages/ADD_MESSAGE', {
              conversationId: this.currentConversationId,
              message
            }))
          })
      }
    },

    computed: {
      ...mapState({
        messages: state => state.messages.all,
        currentConversationId: state => state.conversations.currentId
      }),
      ...mapGetters({
        currentConversation: 'conversations/currentConversation',
      }),
      messageIdsByConversation () {
        return this.$store.getters['messages/messageIdsByConversation'](this.currentConversationId)
      }
    }
  }
</script>

<style scoped>
</style>
