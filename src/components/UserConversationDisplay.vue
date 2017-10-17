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

<style scoped>
.container {
  border-bottom: 1px solid silver;
  padding: 5px;
}

.container:hover {
  background-color: rgba(255, 155, 0, 0.25);
  cursor: pointer;
}

.last-seen {
  font-size: 0.8em;
  text-align: right;
}

.inline-details {
  text-align: right;
  font-size: 0.5em;
}
</style>
