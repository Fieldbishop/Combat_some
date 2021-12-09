<!--
 Sign Up component

 Etusivun headerissa painamalla "Sign up" tekstiä, tuodaan esiin Sign up form.

  Täyttämällä kohdat 'User name', 'Password' ja 'Repeat Password', lähetetään signup olio pää applikaatioon:

  signUp {
    name: '',
    psswd: '',
  }

  Form tarkistaa että salasana on kirjoitettu samalla lailla kumpaankin input laatikkoon.
 -->

<template>
  <div id="sign-up">
    <form class="modal-form" @submit.prevent="handleSignUp">
      <div class="modal-header">
        <h1>Sign up</h1>
        <button class="close" type="button" @click="handleSignupClose">&times;</button>
      </div>
      <div v-if="successSign" class="modal-container">
        <label><b>User name</b></label>

        <p v-if="usernameError" class="error-message">
          Username already taken
        </p>

        <input
            type="text"
            placeholder="Username"
            name="sign-name"
            v-model="signUp.name"
            @focus="clearError"
            required
        />

        <label><b>Password</b></label>
        <input
            type="password"
            placeholder="Password"
            name="sign-pssw"
            v-model="signUp.psswd"
            @focus="clearError"
            required
        />

        <label><b>Repeat Password</b></label>

        <p v-if="psswError" class="error-message">
          Passwords don't match
        </p>

        <input
            type="password"
            placeholder="Repeat Password"
            id="pssw-check"
            @focus="clearError"
            ref="psswdCheck"
            required
        />

        <button type="submit" class="confirmButton">Sign up</button>
        <button type="button" class="cancelButton" @click="$emit('closeModal')">Cancel</button>
      </div>
      <div v-else class="modal-container">
        <h3>Sign up successful</h3>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignUp",
  data() {
    return {
      usernameError: false,
      psswError: false,
      successSign: true,
      signUp: {
        name: '',
        psswd: '',
      }
    }
  },
  methods: {

    // handleSignUp() tarkistaa että salasanat samat, lähettää $emit avulla olion App.vue:lle ja siistii elementit
    async handleSignUp() {
      if(this.signUp.psswd !== this.$refs.psswdCheck.value) {
        this.psswError = true;
        return;
      }

      await axios.post("http://localhost:8081/api/createUser", {
        username: this.signUp.name,
        password: this.signUp.psswd,
      })
      .then(response => {

        this.signUp = {
          name: '',
          psswd: '',
        }

        this.$refs.psswdCheck.value = "";

        if(response.data === "dublicate") {  //Errorin sattuessa response.data palauttaa dublicate ja viesti näytetään
          this.usernameError = true;
        } else {
          this.successSign = false;
          this.$emit("signUp");
        }

      })
      .catch(error => {
        console.log(error)
      });

    },

    clearError() {
      this.psswError = false;
      this.usernameError = false;
    },

    handleSignupClose() {
      this.successSign = false;
      this.$emit('closeModal');
    }

  },
}

</script>

<style scoped>


</style>