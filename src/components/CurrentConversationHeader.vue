<template>
  <div class="container">
    {{ members }}
  </div>
</template>

<script>
  export default {
    name: 'CurrentConversationHeader', 

    props: {
      members: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
.container {
  font-weight: bold;
  padding: 5px;
  border-bottom: 1px solid silver;
  text-align: center;
}
</style>
