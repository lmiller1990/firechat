<template>
  <div class="home-container">
    <div class="large-text">Firechat</div>
    <div class="medium-text">A real time chat application</div>

    <div class="links">
      <router-link to="/signup">
        <div class="fire-button">
          Create Account
        </div>
      </router-link>

      <router-link to="/signin">
        <div class="fire-button">
          Existing Users
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
  .home-container {
    padding-top: 100px;
    text-align: center;
    height: 100vh;
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
