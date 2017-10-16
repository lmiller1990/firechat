<template>
  <div id="main-app-wrapper"> 
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#main-app-wrapper {
  height: 100%;
}

html, body {
  margin: 0;
  height: 100vh;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.large-text { 
  font-size: 48px; 
}
.medium-text { 
  font-size: 24px; 
}
</style>
