<template>
  <div class="container">
    <div v-if="currentConversation">
      Current: {{ currentConversation }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'CurrentConversationContainer',

    computed: {
      ...mapGetters({
        currentConversation: 'conversations/currentConversation'
      })
    }
  }
</script>

<style scoped>
</style>
