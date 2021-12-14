<template>
  <div id="user" class="user-body">
    <div class="user-header">
      <div>
        <h3>{{ this.userData.username }}</h3>
      </div>
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
import axios from "axios";

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
    async getUserData() {
      try {
        let token = document.cookie.split("token=")[1];
        await axios.post("http://localhost:8081/api/userstats", {
          token: token
        })
        .then(response => {
         this.userData.username = response.data[0].userName;
         this.userData.wins = response.data[0].wins;
         this.userData.joins = response.data[0].participations;
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getUserData();
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

.user-header div {
  text-align: center;
  margin: auto;
  width: 50%;
  overflow-wrap: break-word;
}

.user-header .close {
  top: -10px;
}

.user-content {
  text-align: left;
  margin: 15px;
}

</style>