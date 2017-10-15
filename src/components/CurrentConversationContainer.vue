<template>
  <div class="container">
    <div v-if="currentConversation">
      Conversation with {{ members }}
    </div>

    <Message 
      v-for="id in messageIdsByConversation" 
      :message="messages[id]"
      :key="id"
    />

    <div class="new-message-form">
      <NewMessageForm v-model="newMessage" @send="send"/>
      <div @click="send">O</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Message from './Message.vue'
  import NewMessageForm from './NewMessageForm.vue'

  export default {
    name: 'CurrentConversationContainer',

    components: {
      Message,
      NewMessageForm
    },

    data () {
      return {
        newMessage: ''
      }
    },

    methods: {
      send () {
        this.$store.dispatch('messages/send', { 
          conversationId: this.$store.state.conversations.currentId,
          sender: this.$store.state.users.currentUser.uid,
          text: this.newMessage 
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
        currentConversationId: state => state.conversations.currentId,
        users: state => state.users.all
      }),

      ...mapGetters({
        currentConversation: 'conversations/currentConversation',
      }),

      messageIdsByConversation () {
        return this.$store.getters['messages/messageIdsByConversation'](this.currentConversationId)
      },

      members () {
        return this.currentConversation.users.map(x => this.users[x].displayname).join(', ')
      }
    }
  }
</script>

<style scoped>
.container {
  /*margin-left: 10px;*/
}

.new-message-form {
  display: flex;
  flex-direction: row;
}
</style>
