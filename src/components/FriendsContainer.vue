<template>
  <div class="container">
    <UserConversationDisplay 
      v-for="id in allUserIds" 
      :key="id" 
      :user="allUsers[id]" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import UserConversationDisplay from './UserConversationDisplay.vue'

  export default {
    name: 'FriendsContainer',

    components: {
      UserConversationDisplay
    },

    created () {
      this.$store.dispatch('users/getMostRecent')
    },

    computed: {
      ...mapState({
        allUserIds: state => state.users.allIds,
        allUsers: state => state.users.all
      })
    }
  }
</script>

<style scoped>
.container {
  min-width: 200px;
  max-width: 240px;
}
</style>
