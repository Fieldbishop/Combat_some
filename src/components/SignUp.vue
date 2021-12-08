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
        <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
      </div>
      <div class="modal-container">
        <label><b>User name</b></label>
        <input
            type="text"
            placeholder="Username"
            name="sign-name"
            v-model="signUp.name"
            required
        />

        <label><b>Password</b></label>
        <input
            type="password"
            placeholder="Password"
            name="sign-pssw"
            v-model="signUp.psswd"
            @focus="clearPsswError"
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
            @focus="clearPsswError"
            ref="psswdCheck"
            required
        />

        <button type="submit" class="confirmButton">Sign up</button>
        <button type="button" class="cancelButton" @click="$emit('closeModal')">Cancel</button>
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
      psswError: false,
      signUp: {
        name: '',
        psswd: '',
      }
    }
  },
  methods: {

    // handleSignUp() tarkistaa että salasanat samat, lähettää $emit avulla olion App.vue:lle ja siistii elementit
    handleSignUp() {
      if(this.signUp.psswd !== this.$refs.psswdCheck.value) {
        this.psswError = true;
        return;
      }

      axios.post("http://localhost:8081/api/createUser", {
        'username': this.signUp.name,
        'password': this.signUp.psswd,
      })
      .then(response => {
        if(response.status !== 200) {
          alert("Error");
        }
      })
      .catch(error => {
        console.log(error)
      });

      this.signUp = {
        name: '',
        psswd: '',
      }

      this.$refs.psswdCheck.value = "";

    },

    clearPsswError() {
      this.psswError = false;
    },



  },
}

</script>

<style scoped>

.error-message {
  color: #d33c40;
  font-weight: 500;
}

</style>