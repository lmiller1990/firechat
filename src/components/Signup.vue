<template>
  <form>
    <input v-model="email" type="email" placeholder="Email Address" />
    <input 
      v-model="password" 
      type="password" 
      placeholder="Email Address"
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
        password: ''
      }
    },

    methods: {
      signup () {

      }
    }
  }
</script>

<style scoped>
</style>
