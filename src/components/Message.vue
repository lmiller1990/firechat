<template>
  <div class="container">
    <div :class="alignBySender">
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
        return this.senderIsCurrentUser ? 'right-aligned' : 'left-aliged' 
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
  padding-top: 2px;
}

.right-aligned {
  text-align: right;
  padding-left: 100px;
}

.left-aligned {
  text-align: left;
  padding-right: 100px;
}

.message {
  display: inline-block;
  border-radius: 5px;

}
.my-message {
  background-color: rgba(255, 165, 0, 0.5);
  opacity: 50%;
  text-align: left;
}

.friends-message {
  background-color: rgba(100, 100, 100, 0.2);
}
</style>
