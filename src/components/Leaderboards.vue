<template>
  <div id="leaderboards" class="leaderboards-body">
    <div class="leaderboards-header">
      <h3>Leaderboards</h3>
      <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
    </div>
    <table class="leaderboards-content"> <!-- Painamalla jokaista 'tr' pääsee kyseiseen taisteluun, jos ei ole logged in, pyytää kirjautumaan sisään -->
      <tr style="cursor:pointer;" v-for="(leaderboard, index) in leaderboards" :key="index">
        <td @click="handleCup(leaderboard.id)"><b>{{ leaderboard.id }}</b></td>
        <td @click="handleCup(leaderboard.id)">{{ leaderboard.category }}</td>
        <td ref="timeA" @click="handleCup(leaderboard.id)">{{ times[index] }}</td>
        <td v-if="loggedIn"><button class="tableButton" @click="handleImageView(leaderboard.id)">JOIN</button></td> <!-- Napilla voidaan osallistua kisaan -->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "leaderBoards",
  data() {
    return {
      leaderboards: {

      },
      times: [

      ],
      alive: true,
      interval: '',
      tt: '',

    }
  },
  props: {
    loggedIn: Boolean,

  },
  mounted() {
    this.alive = true;
    this.loadCups();

    this.interval = setInterval(() => {
      this.times = [];
      for(let i = 0; i < this.leaderboards.length; i++) {
        this.times.push(this.countdown(this.leaderboards[i].endDate))
      }

      if(!this.alive) {
        clearInterval(this.interval);
      }
    }, 1000);
  },
  beforeDestroy() {
    this.alive = false;
  },

  watch: {

  },
  methods: {
    async loadCups() {
      try {
        await axios.get("http://localhost:8081/api/leaderboards")
        .then(response => {
          this.leaderboards = response.data;
          for(let i = 0; i < this.leaderboards.length; i++) {
            this.times.push(this.countdown(this.leaderboards[i].endDate))
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    countdown(date) {
      let distance = new Date(date).getTime() - new Date().getTime();

      if(distance <= 0) {
        return "ENDED";
      }

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      days = (days <= 0) ? "" : days + " : ";

      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      hours = (hours < 10) ? "0" + hours + " : " : hours + " : ";

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      minutes = (minutes < 10) ? "0" + minutes + " : " : minutes + " : ";

      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return days + hours +  minutes +  seconds;
    },

    handleCup(id) {
      if(!this.loggedIn) {
        this.$emit("modal", [1]);
      } else {
        this.$emit("changeBattle", id);
      }
    },

    handleImageView(id) {
      this.$emit("modal", [4, id])
    }
  },
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

tr:hover {
  background-color: #0ae494;
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
  background-color: #d33c40;
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