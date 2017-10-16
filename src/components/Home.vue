<template>
  <div class="container">
    <div class="large-text">Firechat</div>
    <div class="medium-text">A real time chat application</div>

    <div class="links">
      <router-link to="/signup">
        <div class="fire-button">
          Sign up
        </div>
      </router-link>

      <router-link to="/signin">
        <div class="fire-button">
          Sign in
        </div>
      </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>

<style scoped>
@import './styles.css';
.container {
  text-align: center;
  justify-content: center;
  width: 100%;
  background-color: orange;
}

.links {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

a {
  text-decoration: none;
  cursor: pointer;
}

</style>
