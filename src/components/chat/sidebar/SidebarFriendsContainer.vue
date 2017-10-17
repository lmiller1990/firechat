<template>
  <div class="container">
    <div class="wrapper">
      <SidebarUserItem 
        v-for="id in allUserIdsExceptCurrent" 
        :key="id" 
        :user="allUsers[id]" 
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import SidebarUserItem from './SidebarUserItem.vue'

  export default {
    name: 'SidebarFriendsContainer',

    components: {
      SidebarUserItem
    },

    computed: {
      ...mapState({
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
