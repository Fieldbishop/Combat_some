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
            pattern="[a-zA-Z0-9-]{3,59}"
            @focus="clearError"
            required
        />

        <p v-if="psswLength" class="error-message">
          Password must be at least 5 characters
        </p>

        <label><b>Password</b></label>
        <input
            ref="psswd"
            type="password"
            placeholder="Password"
            name="sign-pssw"
            v-model="signUp.psswd"
            pattern="[a-zA-Z0-9-]{5,499}"
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
      psswLength: false,
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
      if(this.signUp.psswd.length < 5) {
        this.psswLength = true;
        return;
      }

      if(this.signUp.psswd !== this.$refs.psswdCheck.value) {
        this.psswError = true;
        return;
      }

      await axios.post("http://localhost:8081/api/createUser", {
        username: this.signUp.name,
        password: this.signUp.psswd,
      })
      .then(response => {

        this.successSign = false;
        this.$emit("signUp");

      })
      .catch(error => {
        if(error.response.status === 403) {
          this.usernameError = true;
        } else {
          console.log(error);
        }
      });

      this.signUp = {
        name: '',
        psswd: '',
      }
    },

    clearError() {
      this.psswError = false;
      this.usernameError = false;
      this.psswLength = false;
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