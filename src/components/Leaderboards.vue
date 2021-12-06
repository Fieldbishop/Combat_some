<template>
  <div id="leaderboards" class="leaderboards-body">
    <div class="leaderboards-header">
      <h3>Leaderboards</h3>
      <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
    </div>
    <table class="leaderboards-content">
      <tr style="cursor:pointer;">
        <td><b>Daily cup</b></td>
        <td>Nature</td>
        <td>01:23:45</td>
      </tr>
      <tr style="cursor: pointer">
        <td><b>Weekly cup</b></td>
        <td>Space</td>
        <td>01:23:45</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "leaderboards"
}
</script>

<style scoped>

.leaderboards-body {
  background-color: #eeeeee;
  margin: 5% auto 15% auto;
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

tr:nth-child(even) {
  background-color: #dddddd;
}


</style>