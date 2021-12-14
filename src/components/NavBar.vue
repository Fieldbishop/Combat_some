<template>
  <div class="fixed-top">
    <nav class="navbar">
      <div class="nav-container">
        <div class="navbar-left">
          <a href="/" style="float: left;">
            <span class="material-icons" style="font-size: 50px">
              thumb_up
              <!-- <img id="logo" src="../assets/fist_logo.png" alt="imagebattle"> -->
            </span>
          </a>
          <a class="nav-link" id="leaderboards" @click="$emit('modal', 0)"><b>Leaderboards</b></a>
        </div>
        <div id="navbar-user" class="navbar-right" v-if="loggedIn === false">
          <ul>
            <li class="log-text" @click="$emit('modal', 1)">
              <a class="nav-link"><b>Log in</b></a>
            </li>
            <li class="sign-text" @click="$emit('modal', 2)">
                <a class="nav-link"><b>Sign up</b></a>
            </li>
            <li class="log-icon" @click="$emit('modal', 1)">
              <span class="material-icons">login</span>
            </li>
            <li class="sign-icon" @click="$emit('modal', 2)">
              <span class="material-icons">person_add</span>
            </li>
          </ul>
        </div>
        <div id="navbar-logged" class="navbar-right" v-else>
          <ul>
            <li class="log-text" @click="$emit('modal', 3)">
              <a class="nav-link"><b>{{username}}</b></a>
            </li>
            <li class="sign-text" @click="signOut()">
              <a class="nav-link"><b>Sign out</b></a> <!-- this.loggedIn = false -->
            </li>
            <li class="log-icon" @click="$emit('modal', 3)">
              <span class="material-icons">account_circle</span>
            </li>
            <li class="sign-icon" @click="signOut()">
              <span class="material-icons">logout</span>
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

.navbar-left {
  align-items: center;
  display: flex;
}

.navbar-left .nav-link{
  margin-left: 0;
}

.navbar-left * {
  margin: 5px;
}

@media (max-width: 590px) {
  .nav-container {
    justify-content: space-around;
  }

  .navbar-left .nav-link{
    padding: 0;
  }

  .log-text, .sign-text {
    display: none;
  }

  .log-icon, .sign-icon {
    display: flex;
  }

  .navbar-right .nav-link {
    padding: 10px;
  }
}

@media (min-width: 591px) {
  .log-icon, .sign-icon {
    display: none;
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

.log-text, .sign-text {
  background-color: #d33c40;
  margin-right: 10px;
  padding: 8px;
  border-radius: 25px;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
}

.log-icon, .sign-icon {
  margin-right: 15px;
  background-color: #d33c40;
  padding: 10px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
}

.log-icon:hover .material-icons, .sign-icon:hover .material-icons {
  color: white;
}

.log-icon:hover, .sign-icon:hover {
  cursor: pointer;
}

.log-icon .material-icons, .sign-icon .material-icons {
  color: black;
  font-size: 33px;
}

.log-icon:hover {
  background-color: #888888;
}

.sign-icon:hover {
  background-color: #888888;
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

a .material-icons:hover {
  color: white;
}

</style>