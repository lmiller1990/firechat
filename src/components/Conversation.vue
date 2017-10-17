<template>
  <div @click="enterConversation">
    Conversation with: {{ members }}
    {{ mostRecentMessage }}
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'Conversation',

    props: {
      id: {
        required: true,
        type: String
      }
    },

    computed: {
      ...mapState({
        conversations: state => state.conversations.all,
        messages: state => state.messages.all
      }),

      members () {
        return this.$store.getters['users/displaynamesByUserIds'](this.conversations[this.id].users)
      },

      mostRecentMessage () {
        const message = this.messages[this.conversations[this.id].mostRecentMessageId] 
        
        if (message)
          return message.text
      }
    },

    methods: {
      enterConversation () {
        this.$store.commit('conversations/SET_CURRENT_CONVERSATION_ID', { id: this.id })
      }
    },

    created () {
      this.$store.state.db.collection('conversations').where('id', '==', this.id)
        .onSnapshot(snapshot => {
          var source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(`[Conversation.vue] Source: ${source}`)

          snapshot.forEach(convo => {
            const data = convo.data()

            data.messages.forEach(message => {
              if (this.$store.state.messages.allIds.includes(message.id) === false)
                this.$store.commit('conversations/SET_MOST_RECENT_MESSAGE_ID', {
                  conversationId: this.id,
                  messageId: message.id
                })
                this.$store.commit('messages/ADD_MESSAGE', {
                  conversationId: this.id,
                  message
                })
            })
          })
        })
    }
  }
</script>

<style scoped>
</style>
