<template>
  <div id="log-in" class="modal fade">
    <form class="modal-form" action="/log_in" method="post">
      <div class="modal-header">
        <h1>Log In</h1>
        <button class="close" type="button" onclick="document.getElementById('log-in').style.display = 'none'">&times;</button>
      </div>
      <div class="modal-container">
        <label><b>User name</b></label>
        <input type="text" placeholder="Username" name="log-name" v-model="login.name" required>

        <label><b>Password</b></label>
        <input type="password" placeholder="Password" name="log-pssw" v-model="login.psswd" required>

        <button type="submit">Log in</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      login: {
        name: '',
        psswd: '',
      },
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>