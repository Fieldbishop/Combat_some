<template>
  <div id="sign-up" class="modal fade">
    <form class="modal-form" @submit.prevent="handleSignUp">
      <div class="modal-header">
        <h1>Sign up</h1>
        <button class="close" type="button" onclick="document.getElementById('sign-up').style.display = 'none'">&times;</button>
      </div>
      <div class="modal-container">
        <label><b>User name</b></label>
        <input type="text" placeholder="Username" name="sign-name" v-model="signUp.name" required>

        <label><b>Password</b></label>
        <input type="password" placeholder="Password" name="sign-pssw" v-model="signUp.psswd" required>

        <label><b>Repeat Password</b></label>
        <p v-if="psswError" class="error-message">
          Passwords don't match
        </p>
        <input type="password" placeholder="Repeat Password" id="pssw-check" v-model="signUp.psswdCheck" required>

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
        psswdCheck: '',
      }
    }
  },
  methods: {
    handleSignUp() {
      if(this.signUp.psswd !== this.signUp.psswdCheck) {
        this.psswError = true;
        return;
      }
      this.psswError = false;
      console.log("Test");
    }
  },
}

</script>

<style scoped>

.error-message {
  color: #d33c40;
  font-weight: 500;
}

</style>