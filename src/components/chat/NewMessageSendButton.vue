<template>
  <div @click="emitSend" class="send-button">
    <div class="send-icon"></div>
  </div>
</template>

<script>
  export default {
    name: 'NewMessageSendButton',

    methods: {
      emitSend () {
        this.$emit('send')
      }
    }
  }
</script>

<style scoped>
.send-button {
  cursor: pointer;
  padding-left: 5px;
}

.send-icon {
  /**
   * taken from https://css-tricks.com/examples/ShapesOfCSS/
   * by Omid Rasouli
   */
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid orange;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
