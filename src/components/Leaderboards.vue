<template>
  <div id="leaderboards" class="leaderboards-body">
    <div class="leaderboards-header">
      <h3>Leaderboards</h3>
      <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
    </div>
    <table class="leaderboards-content"> <!-- Painamalla jokaista 'tr' pääsee kyseiseen taisteluun, jos ei ole logged in, pyytää kirjautumaan sisään -->
      <tr style="cursor:pointer;">
        <td><b>Daily cup</b></td>
        <td>Nature</td>
        <td>01:23:45</td>
        <td v-if="loggedIn"><button class="tableButton" @click="$emit('modal', 4)">JOIN</button></td> <!-- Napilla voidaan osallistua kisaan -->
      </tr>
      <tr style="cursor: pointer">
        <td><b>Weekly cup</b></td>
        <td>Space</td>
        <td>01:23:45</td>
        <td v-if="loggedIn"><button class="tableButton">JOIN</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "leaderboards",
  data() {
    return {

    }
  },
  props: {
    loggedIn: Boolean,

  },
  methods: {

  }
}
</script>

<style scoped>

.leaderboards-body {
  background-color: #eeeeee;
  margin: 5% auto 25vh auto;
  min-width: 400px;
  max-width: 60%;
  min-height: 500px;
  height: auto;
  border: 1px solid #111111;
}

.leaderboards-header {
  background-color: #888888;
  margin-bottom: 10px;
  padding: 2px;
  position: relative;
  display: block;
  text-align: left;
  color: black;
}

.leaderboards-header h3 {
  margin: 15px;
}

.leaderboards-header .close {
  background-color: #888888;
  top: 10px;
}

.leaderboards-content {
  border-collapse: collapse;
}

td, th {
  text-align: left;
  padding: 10px 50px 10px 10px;
}

table {
  width: 100%;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

td:last-child {
  padding: 10px 0 10px 10px;
}

.tableButton {
  background-color: #04AA6D;
  color: white;
  border: none;
  padding: 5px 15px;
}

.tableButton:hover {
  background-color: #0ae494;
  cursor: pointer;
}

@media (max-width: 780px) {
  td, th {
    padding: 0 25px 0 10px;
    height: auto;
  }

  .tableButton {
    padding: 20px 20px;
  }
}

</style>