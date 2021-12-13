<template>
  <div id="battle-content" class="content-container">
    <div class="cup-container">
      <div id="cup-image" class="image-container cup-content">
        <div v-if="loggedIn" id="test-main" class="test">
          <div @click="downVote" id="test-left" class="test"><span class="material-icons">arrow_downward</span></div>
          <div @click="upVote" id="test-right" class="test"><span class="material-icons">arrow_upward</span></div>
        </div>
        <img ref="image" :src="images[0]" alt="winner photo" @load="imageLoaded">
      </div>
      <div v-if="imageUp" id="cup-string" class="cup-text cup-content">
        <h3 ref="name">{{ cupData.name }}</h3>
        <h4 ref="category">{{ cupData.category }}</h4>
        <h4 ref="time">{{ cupData.time }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MainContent",
  data() {
    return {
      imageUp: false,
      cupInfo: undefined,
      cupData: {
        name: '',
        category: '',
        time: ''
      },
      interval: '',
      cupSubmissions: [],
      images: [],
      readImage: null,
      currentSubmissionIndex: 0,
    }
  },
  props: {
    loggedIn: Boolean,
    battleId: Number,
  },
  watch: {
    battleId() {
      this.loadBattleInfo(this.battleId);
      console.log(this.battleId);
      (async()=>{
        await axios.get('http://localhost:8081/api/submissionData',
            {params: { id: this.battleId, }} )
        .then(response => {
          console.log(response.data);
          this.cupSubmissions = [...response.data];
        }).catch(error =>{
          console.log(error)
        })
      })()
    },
    cupInfo(){
      this.updateElements();
    },
    cupSubmissions(){
      this.defineRandomImageId();
      this.nextImage();
    },
    currentSubmissionIndex(){
      this.nextImage();
    },
    images(){
      //console.log(this.images[this.currentSubmissionIndex].data);
      console.log(this.images[this.currentSubmissionIndex]);
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if(!this.cupInfo && this.battleId){
        console.log("should load battleInfo again!");
        this.loadBattleInfo(this.battleId);
      }
      this.cupData.time = this.countdown(this.cupInfo.endDate);
    }, 1000);
  },
  methods: {
    upVote() {
      this.$emit('vote', 1, this.cupSubmissions[this.currentSubmissionIndex].id);
      this.defineRandomImageId();
    },

    downVote() {
      this.$emit('vote', -1, this.cupSubmissions[this.currentSubmissionIndex].id);
      this.defineRandomImageId();
    },

    nextImage() {
      this.$refs.image.style.display = "none";
      this.imageUp = false;
      console.log(this.currentSubmissionIndex);
      this.loadImage(this.cupSubmissions[this.currentSubmissionIndex].imageFilepath);
    },
    updateElements() {
      this.cupData.name = this.cupInfo.id;
      this.cupData.category = this.cupInfo.category;
    },

    async loadBattleInfo(id) {
      await axios.get("http://localhost:8081/api/leaderboards",
          {params: { id: id, }})
      .then(response => {
        //console.log(response);
        this.cupInfo = response.data[0];
        this.cupData.time = this.countdown(response.data[0].endDate);
      }).catch(error =>{
        console.log(error);
      })
    },
    async loadImage(path){
      console.log("Loading image with path : " + path);
      await (async () => {
        await axios.get('http://localhost:8081/api/images',{params: { path: path } }).then(response => {
          this.images = [...this.images, response];
          this.$refs.image.style.display = "block";
          this.imageUp = true;
        }).catch(error => {
          console.log(error)
        })
      })()
    },
    defineRandomImageId(){
      this.currentSubmissionIndex = Math.floor(Math.random() * this.cupSubmissions.length);
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
    }
  },

}

</script>

<style scoped>

.content-container {
  height: 100%;
  padding: 0.5rem 0.5rem 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
}

.cup-content {
  display: flex;
  max-width: 100%;
  height: auto;
}

.image-container img{
  max-width: 100%;
  min-height: 300px;
  height: auto;
  border: 1px solid #111111;
  max-height: 640px;
  display: none;
  margin-bottom: 10px;
}

.image-container {
  position: relative;
  width: 100%;
}

.cup-container {
  max-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto 10px auto;
}

.cup-text {
  width: auto;
  background-color: #404040;
  justify-content: space-around;
  color: white;
}

.test {
  height: 100%;
  top:0;
  position: absolute;
}

#test-main {
  left: 0;
  width: 100%;
}

#test-left {
  display: flex;
  align-items: center;
  left: 0;
  width: 50%;
}

#test-left:hover {
  cursor: pointer;
}

#test-main span {
  display: none;
  margin: 50px;
}

#test-left:hover span {
  display: block;
}

#test-right:hover span {
  display: block;
}

#test-right {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  right: 0;
  width: 50%;
}

#test-right:hover {
  cursor: pointer;
}

</style>