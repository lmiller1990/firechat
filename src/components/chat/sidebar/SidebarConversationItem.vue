<template>
  <div class="container" @click="enterConversation">
    <div>
      {{ members }}
    </div>
    <div class="last-seen">
      {{ mostRecentMessage }}
    </div>
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
        messages: state => state.messages.all,
        currentUserId: state => state.users.currentUser.uid
      }),

      members () {
        return this.$store.getters['users/displaynamesByUserIds']
          (this.conversations[this.id].users.filter(x => x !== this.currentUserId))[0]
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
      console.log('Created', this.id)
      this.$store.state.db.collection('conversations').where('id', '==', this.id)
        .onSnapshot(snapshot => {
          var source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(`[Conversation.vue] Source: ${source}`)

          snapshot.forEach(convo => {
            const data = convo.data()

            data.messages.forEach(message => {
              if (this.$store.state.messages.allIds.includes(message.id) === false) {
                this.$store.commit('conversations/SET_MOST_RECENT_MESSAGE_ID', {
                  conversationId: this.id,
                  messageId: message.id
                })
                console.log('Adding message')
                this.$store.commit('messages/ADD_MESSAGE', {
                  conversationId: this.id,
                  message
                }) 
              }
            })
          })
        })
    }
  }
</script>

<style scoped src="./SidebarItems.css">
</style>
