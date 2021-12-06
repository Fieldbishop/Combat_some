<template>
  <div id="app">
    <nav-bar :loggedIn="loggedIn" @signOut:="handleSignOut" @modal="toggleModal"/> <!-- ':' emits, '@' listens -->
    <modal-container v-if="modalVisible" :modalId="modalId">
      <template v-slot:loginSlot>
        <log-in @loggin:login="handleLogin" @closeModal="toggleModal"/>
      </template>
      <template v-slot:signupSlot>
        <sign-up @signingUp:signUp="handleSignup" @closeModal="toggleModal"/>
      </template>
    </modal-container>
    <main-content/>
    <battle-popup v-if="loggedIn === true"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MainContent from "./components/MainContent";
import BattlePopup from "./components/BattlePopup";
import ModalContainer from "./components/ModalContainer";

export default {
  name: 'App',
  components: {
    ModalContainer,
    BattlePopup,
    MainContent,
    LogIn,
    SignUp,
    NavBar,
  },
  data() {
    return {
      loggedIn: false,
      modalVisible: false,
      modalId: '',

    }
  },
  mounted() {

  },

  methods: {

    toggleModal(id) {
      this.modalId = id;
      this.modalVisible = !this.modalVisible;

      console.log(this.modalId, this.modalVisible);
    },

    handleLogin(login) {
      console.log(login);
      this.loggedIn = true;
    },

    handleSignup(signUp) {
      console.log(signUp);
    },

    handleSignOut() {
      this.loggedIn = false;
    },



  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 72px;
}

body {
  color: #404040;
  background: white;
  font-size: 1rem;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

.modal-form {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 480px;
}

.modal-header {
  display: block;
  position: relative;
}

.close {
  position: absolute;
  background: #fefefe;
  right: 25px;
  top: 0;
  border: none;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover {
  color: red;
  cursor: pointer;
}

.modal-container {
  margin-right: 0;
  padding: 16px;
}

.modal-container input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.confirmButton {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  width: 50%;
}

.confirmButton:hover {
  background-color: #0ae494;
  cursor: pointer;
}

.cancelButton {
  background-color: #d33c40;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  width: 50%;
}

.cancelButton:hover {
  background-color: #f72a1b;
  cursor: pointer;
}

</style>
