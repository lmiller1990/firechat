<template>
  <div class="container" @click="enterConversation">
    {{ user.displayname }} - {{ user.email }}
    <div class="last-seen">active {{ $moment(user.lastSeen).fromNow() }}</div>
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
  border-bottom: 1px solid silver;
  padding: 5px;
}

.container:hover {
  background-color: rgba(255, 155, 0, 0.25);
}

.last-seen {
  font-size: 0.8em;
  text-align: right;
}
</style>
