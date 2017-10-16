<template>
  <div class="container">
    <input v-model="email" type="email" placeholder="Email Address" class="fire-input"/>
    <input 
      v-model="password" 
      type="password" 
      class="fire-input"
      placeholder="password"
      @keydown.enter.prevent="signin" />

    <button @click.prevent="signin" class="fire-button">Sign in</button>
    <button @click.prevent="mock" class="fire-button">Mock in</button>
  </div>
</template>

<script>
  export default {
    name: 'Signin',

    created () {
      if (this.$store.state.users.currentUser)
        this.mock()
    },

    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      mock () {
        console.log('Mock in')
        this.$store.dispatch('users/signin', { email: 'abc@de.com', password: 'password' })
        .then(() => this.$router.push({ name: 'chat' }))
      },
      signin () {
        console.log('Signin in')
        if (this.email.length > 6 && this.password.length > 6) {
          this.$store.dispatch('users/signin', { email: this.email, password: this.password })
          .then(() => this.$router.push({ name: 'chat' }))
        }
      }
    }
  }
</script>

<style scoped>
  @import './styles.css';
</style>
