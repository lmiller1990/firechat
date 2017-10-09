<template>
  <div>
		<Signin />
  </div>  
</template>

<script>
import { mapState } from 'vuex'
import Signin from './components/Signin.vue'

export default {
  name: 'app',
  
	components: {
		Signin
	}
}
</script>

<style>
</style>
