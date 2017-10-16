<template>
  <div class="container">
    <input v-model="email" type="email" placeholder="Email Address" class="fire-input" />
    <input v-model="displayname" type="text" placeholder="Display name" class="fire-input" />
    <input 
      v-model="password" 
      @keydown.enter.prevent="signin" 
      type="password" 
      placeholder="password"
      class="fire-input"
    />
    <button type="input" @click.prevent="signup" class="fire-button">Sign up</button>
  </div>
</template>

<script>
  export default {
    name: 'Signup',

    data () {
      return {
        email: '',
        password: '',
        displayname: ''
      }
    },

    methods: {
      signup () {
        this.$store.dispatch('users/createUser', {
          email: this.email,
          password: this.password,
          displayname: this.displayname
        })
      }
    }
  }
</script>

<style scoped>
  @import './styles.css';
</style>
