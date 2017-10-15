<template>
  <div class="container">
    <div :style="alignBySender">
      <div :class="sentBy">
        {{ message.text }}
      </div>
    </div>
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
      senderIsCurrentUser () {
        return this.message.sender === this.$store.state.users.currentUser.uid 
      },

      alignBySender () {
        return this.senderIsCurrentUser ? { 'text-align': 'right' } : {}
      },

      sentBy () {
        return this.senderIsCurrentUser 
        ? 'message my-message'
        : 'message friends-message'
      }
    }
  }
</script>

<style scoped>
.container {

}

.message {
  display: inline-block;
  border-radius: 5px;

}
.my-message {
  background-color: orange;
}

.friends-message {
  background-color: red;
}
</style>
