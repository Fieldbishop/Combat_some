<template>
  <div id="user" class="user-body">
    <div class="user-header">
      <h3>Br4ndon</h3>
      <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
    </div>
    <hr>
    <div class="user-content">
      <p>Wins: 3</p>
      <p>Submits: 10</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "User-item"
}
</script>

<style scoped>

.user-body {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  width: 300px;
  padding: 16px;
}

.user-header {
  display: block;
  position: relative;
}

.user-header .close {
  top: -10px;
}

.user-content {
  text-align: left;
  margin: 15px;
}

</style>