<template>
  <div class="home-container">
    <div class="fire-icon-large"></div>
    <div class="large-text">
      Firechat
    </div>
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

    <div class="forms">
      <router-view></router-view>
    </div>
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
    color: red;
  }

.links {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.fire-icon-large {
  /**
   * taken from https://css-tricks.com/examples/ShapesOfCSS/
   * by Omid Rasouli
   */
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 32px solid transparent;
  border-right: 32px solid transparent;
  border-top: 40px solid red;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}


.forms {
  margin-top: 32px;
}
</style>
