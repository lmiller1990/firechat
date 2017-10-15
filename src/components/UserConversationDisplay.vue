<template>
  <div class="container" @click="enterConversation">
    {{ user.displayname }}
    <div>Last Active: {{ $moment(user.lastSeen).format('DD MMM:hh mm ss') }}</div>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
.container {
  border-bottom: 1px solid grey;
  padding: 5px;
}
</style>
