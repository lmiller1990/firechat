<template>
  <div>
		<form>
			<input v-model="email" type="email" placeholder="Email Address" />
			<input v-model="password" type="password" placeholder="Email Address" />
			<button type="submit" @click="signin">Sign in</button>
		</form>
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
			signin (e) {
				if (this.email.length > 6 && this.password.length > 6) {
					this.$store.dispatch('users/signin', { email: this.email, password: this.password })
				}
			}
		}
  }
</script>

<style scoped>
</style>
