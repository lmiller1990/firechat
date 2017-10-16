<template>
  <div class="container">
    <div class="header" v-if="currentConversation">
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
        needScrollToLastMessage: true
      }
    },

    updated () {
      this.scrollIfNeeded()
    },

    methods: {
      scrollIfNeeded () {
        if (this.needScrollToLastMessage) {
          const el = this.$el.querySelector('.messages')
          el.scrollTop = el.scrollHeight
          this.needScrollToLastMessage = false
        }
      },

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
            console.log('source', source)
            // TODO: 'Such and such is typing a message' console.log(`Source ${source}`)

            const messages = snapshot.data().messages

            for (let m in messages) {
              this.$store.commit('messages/ADD_MESSAGE', {
                conversationId: this.currentConversationId,
                message: messages[m]
              })
            }

            // new messages added so we should rescroll
            this.needScrollToLastMessage = true
            this.scrollIfNeeded()
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
