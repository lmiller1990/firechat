<template>
  <input 
    :value="value" 
    @input="emitter"
    @keyup.enter="emitSend"
    class="stretch" 
  />
</template>

<script>
  export default {
    name: 'NewMessageForm',

    props: {
      value: {
        type: String,
        required: true
      }
    },

    methods: {
      emitSend () {
        this.$emit('send')
      },

      emitter (e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style scoped>
.stretch {
  width: 100%;
}
</style>
