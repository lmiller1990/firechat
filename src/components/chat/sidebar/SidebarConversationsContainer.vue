<template>
  <div>
    <SidebarConversationItem v-for="id in conversationIds" :id="id" :key="id" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SidebarConversationItem from './SidebarConversationItem.vue'

  export default {
    name: 'SidebarConversationsContainer',

    components: {
      SidebarConversationItem
    },

    computed: {
      ...mapState({
        conversationIds: state => state.conversations.allIds,
      }),
    },
  }
</script>

<style scoped>
</style>
