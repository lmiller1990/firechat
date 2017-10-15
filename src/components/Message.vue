<template>
  <div class="container">
    <span :class="sentBy">
      {{ message.text }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Message',

    props: {
      message: {
        type: Object,
        required: true
      }
    },

    computed: {
      sentBy () {
        return this.message.sender === this.$store.state.users.currentUser.uid 
        ? 'my-message'
        : 'friends-message'
      }
    }
  }
</script>

<style scoped>
.container {

}
</style>
