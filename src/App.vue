<template>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chat from './components/Chat.vue'
import Home from './components/Home.vue'

export default {
  name: 'app',

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100vh;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.large-text { 
  font-size: 48px; 
}
.medium-text { 
  font-size: 24px; 
}
</style>
