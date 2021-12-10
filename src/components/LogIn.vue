<!--
 Log In component

 Etusivun headerissa painamalla "Log in" tekstiä, tuodaan esiin Log in form.

  Täyttämällä kohdat 'User name' ja 'Password', lähetetään login olio pää applikaatioon:

  login {
    name: '',
    psswd: '',
  }


 -->

<template>
  <div id="log-in">
    <form class="modal-form" @submit.prevent="handleLogIn">
      <div class="modal-header">
        <h1>Log In</h1>
        <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
        <h3 v-if="error" class="error-message">{{this.errorMsg}}</h3>
      </div>
      <div class="modal-container">
        <label><b>User name</b></label>
        <input
            type="text"
            placeholder="Username"
            name="log-name"
            v-model="login.name"
            required
            @focus="clearError"
        />

        <label><b>Password</b></label>
        <input
            type="password"
            placeholder="Password"
            name="log-pssw"
            v-model="login.psswd"
            required
            @focus="clearError"
        />

        <button type="submit" class="confirmButton">Log in</button>
        <button type="button" class="cancelButton" @click="$emit('closeModal')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LogIn",
  data() {
    return {
      login: {
        name: '',
        psswd: '',
      },
      error: false,
      errorMsg: '',
    }
  },
  methods: {

    clearError() {
      this.error = false;
      this.errorMsg = '';
    },

    async handleLogIn() {

      try {
        await axios.post("http://localhost:8081/api/login", {
          username: this.login.name,
          password: this.login.psswd,
        })
        .then(response => {
          this.login = {
            name: '',
            psswd: '',
          }
          this.$emit('login', response.data);
        })
      } catch (error) {
        console.log(error.response.data.error);
        this.errorMsg = error.response.data.error;
        this.error = true;
      }


    },

  },
}
</script>

<style scoped>

</style>