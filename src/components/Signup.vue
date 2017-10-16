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
    <button type="input" @click.prevent="signup" class="fire-button">
      Sign up and Log in
    </button>
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
        .then(() => this.$store.dispatch('users/signin', {
          email: this.email,
          password: this.password
        }))
        .then(() => this.$router.push({ name: 'chat' }))
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
