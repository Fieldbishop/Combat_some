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
  <div id="sign-up" class="modal">
    <form class="modal-form" @submit.prevent="handleSignUp">
      <div class="modal-header">
        <h1>Sign up</h1>
        <button class="close" type="button" onclick="document.getElementById('sign-up').style.display = 'none'">&times;</button>
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
            required
        />

        <button type="submit">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
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
      if(this.signUp.psswd !== document.getElementById("pssw-check").value) {
        this.psswError = true;
        return;
      }

      this.$emit('signingUp:signUp', this.signUp);
      this.signUp = {
        name: '',
        psswd: '',
      }

      document.getElementById("pssw-check").value = "";

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