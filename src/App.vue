<template>
  <div id="app">
    <nav-bar :loggedIn="userState.loggedIn" @signOut="handleSignOut" @modal="toggleModal"/> <!-- ':' emits, '@' listens -->
    <modal-container v-if="modalVisible" :modalId="modalId">
      <template v-slot:loginSlot>
        <log-in @login="handleLogin" @closeModal="toggleModal" ref="login"/>
      </template>
      <template v-slot:signupSlot>
        <sign-up @signUp="handleSignup" @closeModal="toggleModal"/>
      </template>
      <template v-slot:leaderboardsSlot>
        <leader-boards :loggedIn="userState.loggedIn" @closeModal="toggleModal" @modal="changeModal" @changeBattle="showBattle"/>
      </template>
      <template v-slot:userSlot>
        <user @closeModal="toggleModal"/>
      </template>
      <template v-slot:submitSlot>
        <image-uploader :battleId="battleId" :username="userState.user" @closeModal="toggleModal"/>
      </template>
    </modal-container>
    <main-content :loggedIn="userState.loggedIn" :battleId="battleId" @vote="voteImage"/>
    <battle-popup v-if="userState.loggedIn" @modal="toggleModal"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MainContent from "./components/MainContent";
import BattlePopup from "./components/BattlePopup";
import ModalContainer from "./components/ModalContainer";
import User from "./components/User";
import ImageUploader from "./components/ImageUploader";
import LeaderBoards from "./components/Leaderboards";
import axios from "axios";

export default {
  name: 'App',
  components: {
    LeaderBoards,
    ImageUploader,
    User,
    ModalContainer,
    BattlePopup,
    MainContent,
    LogIn,
    SignUp,
    NavBar,
  },
  data() {
    return {
      loggedIn: false,
      modalVisible: false,
      modalId: '',
      userState: {
        token: null,
        user: null,
        loggedIn: false,
      },
      battleId: undefined,
      cupIds: [],

    }
  },
  beforeMount() {
    this.getLeaderboardIds();
  },
  mounted() {
    let token = document.cookie.split("token=")[1];
    this.setToken(token);
    this.checkToken(document.cookie);
  },

  methods: {

    toggleModal(id) {
      this.checkToken(document.cookie);
      this.modalId = id;
      this.modalVisible = !this.modalVisible;
    },

    changeModal(id) {
      this.checkToken(document.cookie);
      if(id.length === 1) {
        this.modalId = id[0];
      } else {
        this.battleId = id[1];
        this.modalId = id[0];
      }
    },

    showBattle(id) {
      this.modalVisible = false;
      this.battleId = id;
    },

    handleLogin(data) {
      this.justLogin(data.user.username);
      this.setToken(data.token);
      this.toggleModal(null);
    },

    justLogin(username){
      this.userState.loggedIn = true;
      this.userState.user = username;
    },

    setToken(token) {
      this.userState.token = token;
      document.cookie = `token=${token}`;
    },

    handleSignup() {

    },

    handleSignOut() {
      this.userState.loggedIn = false;
      this.setToken(null);
      this.userState.user = null;
    },

    /*voteImage(vote, id) {
      console.log(id)
      switch (vote) {
        case 0:
          console.log("Downvote");
          break;
        case 1:
          console.log("Upvote");
          break;
        default:
          console.log("Unknown");
          break;
      }
    },*/

    async voteImage(vote, id) {
      if(this.userState.token != null){
        try {
          await axios.post("http://localhost:8081/api/rate", {
            "id": id,
            "token": this.userState.token,
            "vote": vote
          })
          .then(response => {
            console.log(response.data);
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("NOT LOGGED IN") //GENERIC TOKEN CHECK
      }
    },

    async checkToken(cookie) {
      let token = cookie.split("token=")[1];
      try {
        await axios.post("http://localhost:8081/api/verify", {
          "token": token
        }).then(response => {
          if(!response.data.error) {
            this.justLogin(response.data.data.username)
          } else {
            this.handleSignOut()
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getLeaderboardIds() {
      try {
        await axios.get("http://localhost:8081/api/leaderboards")
            .then(response => {
              this.cupIds = [];
              for(let i = 0; i < response.data.length; i++) {
                this.cupIds.push(response.data[i].id);
              }
              this.battleId = this.cupIds[Math.floor(Math.random() * this.cupIds.length)];
            })
      } catch (error) {
        console.log(error);
      }
    },

  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 72px;
}

body {
  color: #404040;
  background: white;
  font-size: 1rem;
}

.modal {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.5);
  padding-top: 60px;
}

.modal-form {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 480px;
}

.modal-header {
  display: block;
  position: relative;
}

.close {
  position: absolute;
  background: #fefefe;
  right: 25px;
  top: 0;
  border: none;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover {
  color: red;
  cursor: pointer;
}

.modal-container {
  margin-right: 0;
  padding: 16px;
}

.modal-container input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.confirmButton {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  width: 50%;
}

.confirmButton:hover {
  background-color: #0ae494;
  cursor: pointer;
}

.cancelButton {
  background-color: #d33c40;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  width: 50%;
}

.cancelButton:hover {
  background-color: #f72a1b;
  cursor: pointer;
}

.error-message {
  color: #d33c40;
  font-weight: 500;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 50px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  color: #111111;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}


</style>
