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

    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      mock () {
        this.$store.dispatch('users/signin', { email: 'lachlan@test.com', password: 'password' })
          .then(() => {
            this.$store.dispatch('conversations/getCurrentUserConversations')
            this.$router.push({ name: 'chat' })
          })
      },

      signin () {
        if (this.email.length > 6 && this.password.length > 6) {
          this.$store.dispatch('users/signin', { 
            email: this.email, password: this.password 
          })
            .then(() => {
              this.$router.push({ name: 'chat' })
            })
          .catch(err => console.log('Error', err))
        }
      }
    }
  }
</script>

<style scoped>
  @import './styles.css';
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fire-button {
    width: 276px;
  }
</style>
