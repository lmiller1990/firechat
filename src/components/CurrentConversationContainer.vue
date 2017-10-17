<template>
  <div class="container">
    <div class="header">
      <CurrentConversationHeader :members="members" />
    </div>

    <div class="messages">
      <Message 
        v-for="id in messageIdsByConversation" 
        :message="messages[id]"
        :key="id"
      />
    </div>

    <div class="footer">
      <NewMessageForm v-model="newMessage" @send="send" class="new-message-form"/>
      <NewMessageSendButton @send="send" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Message from './Message.vue'
  import NewMessageForm from './NewMessageForm.vue'
  import NewMessageSendButton from './NewMessageSendButton.vue'
  import CurrentConversationHeader from './CurrentConversationHeader.vue'

  export default {
    name: 'CurrentConversationContainer',

    components: {
      Message,
      NewMessageForm,
      NewMessageSendButton,
      CurrentConversationHeader
    },

    data () {
      return {
        newMessage: '',
      }
    },

    updated () {
      this.scrollToLastMessage()
    },

    methods: {
      scrollToLastMessage () {
        const el = this.$el.querySelector('.messages')
        el.scrollTop = el.scrollHeight
      },

      send () {
        this.$store.dispatch('messages/send', { 
          conversationId: this.$store.state.conversations.currentId,
          sender: this.$store.state.users.currentUser.uid,
          text: this.newMessage 
        })
      }
    },

    computed: {
      ...mapState({
        messages: state => state.messages.all,
      }),

      ...mapGetters({
        currentConversation: 'conversations/currentConversation',
      }),
      
      messageIdsByConversation () {
        return this.$store.getters['messages/messageIdsByConversation'](this.currentConversation.id)
      },

      members () {
        return this.$store.getters['users/displaynamesByUserIds'](this.currentConversation.users)
      }
    }
  }
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.messages {
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
  padding: 2px;
}

.footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
}

.header {
  flex-shrink: 0;
}
</style>
