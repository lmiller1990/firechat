<template>
  <div class="container">
    <UserConversationDisplay 
      v-for="id in allUserIdsExceptCurrent" 
      :key="id" 
      :user="allUsers[id]" />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
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
      }),
      ...mapGetters({
        allUserIdsExceptCurrent: 'users/allUserIdsExceptCurrent'
      })
    }
  }
</script>

<style scoped>
</style>
