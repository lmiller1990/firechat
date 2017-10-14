<template>
  <div>
    <form>
      <input v-model="email" type="email" placeholder="Email Address" />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Email Address"
        @keydown.enter.prevent="signin" />
      <button type="input" @click.prevent="signin">Sign in</button>
      <button type="input" @click.prevent="mock">Mock in</button>
    </form>
    Current user: {{ $store.state.users.currentUser }}
  </div>
</template>

<script>
  export default {
    name: 'Signin',

    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      mock () {
        this.$store.dispatch('users/signin', { email: 'abc@de.com', password: 'password' })
      },
      signin () {
        if (this.email.length > 6 && this.password.length > 6) {
          this.$store.dispatch('users/signin', { email: this.email, password: this.password })
        }
      }
    }
  }
</script>

<style scoped>
</style>
