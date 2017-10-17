<template>
  <div class="container">
    <div class="wrapper">
      <UserConversationDisplay 
        v-for="id in allUserIdsExceptCurrent" 
        :key="id" 
        :user="allUsers[id]" />
    </div>
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
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.wrapper {
  overflow: auto;
  flex-grow: 1;
}
</style>
