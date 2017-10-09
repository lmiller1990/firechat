<template>
  <div>
		<input v-model="email" type="email" placeholder="Email Address" />
		<input v-model="password" type="password" placeholder="Email Address" />
		<button @click="signin">Sign in</button>
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
			signin () {
				this.$store.dispatch('users/signin', { email: this.email, password: this.password })
			}
		}
  }
</script>

<style scoped>
</style>
