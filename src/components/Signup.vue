<template>
  <form>
    <input v-model="email" type="email" placeholder="Email Address" />
    <input v-model="displayname" type="text" placeholder="Display name" />
    <input 
      v-model="password" 
      type="password" 
      placeholder="password"
      @keydown.enter.prevent="signin" />
    <button type="input" @click.prevent="signup">Sign up</button>
  </form>
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
</style>
