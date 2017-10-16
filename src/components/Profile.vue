<template>
  <div class="container">
    <p v-if="users[currentUser.uid]">
      Welcome, {{ users[currentUser.uid].displayname }}.
    </p>
    <p v-else>
      Loading current user.
    </p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Profile',

    computed: {
      ...mapState({
        currentUser: state => state.users.currentUser,
        users: state => state.users.all
      })
    }
  }
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
