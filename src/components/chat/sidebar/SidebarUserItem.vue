<template>
  <div class="container" @click="enterConversation">
    <div>
      {{ user.displayname }}
      <div class="inline-details">
        {{ user.email }}
      </div>
    </div>

    <div class="last-seen">active {{ $moment(user.lastSeen).fromNow() }}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'UserConversationDisplay',

    props: {
      user: {
        type: Object,
        required: true
      }
    },

    methods: {
      enterConversation () {
        this.$store.dispatch('conversations/createOrFetchConversation', { user: this.user })
      }
    },
  }
</script>

<style scoped src="./SidebarItems.css">
</style>
