<template>
  <div id="user" class="user-body">
    <div class="user-header">
      <h3>{{ this.userData.username }}</h3>
      <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
    </div>
    <hr>
    <div class="user-content">
      <p>Wins: {{ this.userData.wins }}</p>
      <p>Submits: {{ this.userData.joins }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "User-item",
  data() {
    return {
      userData: {
        username: '',
        wins: '',
        joins: ''
      }
    }
  },
  methods: {

  },
  mounted() {

  }
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