<template>
  <div class="fixed-top">
    <nav class="navbar">
      <div class="nav-container">
        <div class="navbar-left">
          <a href="/" style="float: left;">
            <span>
              <img id="logo" src="../assets/fist_logo.png" alt="imagebattle">
            </span>
          </a>
          <a class="nav-link" id="leaderboards" @click="$emit('modal', 0)"><b>Leaderboards</b></a>
        </div>
        <div id="navbar-user" class="navbar-right" v-if="loggedIn === false">
          <ul>
            <li>
              <a class="nav-link" @click="$emit('modal', 1)"><b>Log in</b></a>
            </li>
            <li>
                <a class="nav-link" @click="$emit('modal', 2)"><b>Sign up</b></a>
            </li>
          </ul>
        </div>
        <div id="navbar-logged" class="navbar-right" v-else>
          <ul>
            <li>
              <a class="nav-link" @click="$emit('modal', 3)"><b>{{username}}</b></a>
            </li>
            <li>
              <a class="nav-link" @click="signOut()"><b>Sign out</b></a> <!-- this.loggedIn = false -->
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {

    }
  },
  props: {
    loggedIn: Boolean,
    username: String
  },
  methods: {
    signOut() {   // What should happen when logging off?
      this.$emit('signOut');
    },

  }
}
</script>

<style scoped>

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
}

.navbar {
  background: #eeeeee;
  height: 56px;
  position: relative;
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
}

.nav-container {
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
}

#logo{
  max-width: 50px;
  max-height: 50px;
}

.navbar-left {
  align-items: center;
  display: flex;
}

.navbar-left * {
  margin: 10px;
}

@media (max-width: 590px) {
  .nav-container {
    justify-content: space-around;
  }

  .navbar-right .nav-link {
    padding: 10px;
  }
}


.navbar-right ul {
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.navbar-right ul li {
  display: inline-block;
}

.navbar-right ul form input {
  max-width: 5em;
  margin: 0.5em;
}

.nav-link {
  color: #2c3e50;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.nav-link:hover {
  color: cadetblue;
  cursor: pointer;
}

</style>