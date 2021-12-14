<template>
  <div id="battle-content" class="content-container">
    <div class="cup-container">
      <div id="cup-image" class="image-container cup-content">
        <div v-if="loggedIn" id="rate-main" class="rate">
          <div @click="downVote" id="rate-left" class="rate">
            <div class="circle"><span class="material-icons">thumb_down</span></div>
          </div>
          <div @click="upVote" id="rate-right" class="rate">
            <div class="circle"><span class="material-icons">thumb_up</span></div>
          </div>
        </div>
        <img ref="image" :src="(images[currentImageIndex] !== undefined) ? images[currentImageIndex].url: null" alt="winner photo">
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
      cupIndex: 0,
      currentImageIndex: 0,
    }
  },
  props: {
    loggedIn: Boolean,
    battleId: Number,
  },
  watch: {
    battleId() {
      (async()=>{
        await axios.get('http://localhost:8081/api/submissionData',
            {params: { id: this.battleId, }} )
        .then(response => {
          if(response.data.length > 0){
            this.loadBattleInfo(this.battleId);
            this.cupSubmissions = [];
            this.images = [];
            this.cupSubmissions = [...response.data];
          } else{
            this.$emit('changeBattleId');
          }
        }).catch(error =>{
          console.warn(error)
        })
      })()
    },
    cupInfo(){
      this.updateElements();
    },
    cupSubmissions(){
      this.shuffle();
      this.nextImage();
    },
    cupIndex(){
      console.log("cupIndex was called.")
      this.nextImage();
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if(!this.cupInfo && this.battleId){
        this.loadBattleInfo(this.battleId);
      } else{
        this.cupData.time = this.countdown(this.cupInfo.endDate);
      }
    }, 1000);
  },
  methods: {
    upVote() {
      this.$emit('vote', 1, this.cupSubmissions[this.cupIndex].id);
      this.cupIndexChange();
    },
    downVote() {
      this.$emit('vote', -1, this.cupSubmissions[this.cupIndex].id);
      this.cupIndexChange();
    },
    cupIndexChange(){
      this.cupIndex++;
      if(this.cupIndex === this.cupSubmissions.length){
        this.cupIndex = 0;
        this.$emit('changeBattleId');
      }
    },
    nextImage() {
      if(this.images.length !== this.cupSubmissions.length){
        this.$refs.image.style.display = "none";
        this.imageUp = false;
        this.loadImage(this.cupSubmissions[this.cupIndex].imageFilepath);
      }
    },
    updateElements() {
      this.cupData.name = this.cupInfo.id;
      this.cupData.category = this.cupInfo.category;
    },

    async loadBattleInfo(id) {
      await axios.get("http://localhost:8081/api/leaderboards",
          {params: { id: id, }})
      .then(response => {
        this.cupInfo = response.data[0];
        this.cupData.time = this.countdown(response.data[0].endDate);
      }).catch(error =>{
        console.warn(error);
      })
    },
    async loadImage(path){
      if(!this.images.find(element => element.path === path)){
        await (async () => {
          await axios.get('http://localhost:8081/api/images',{params: { path: path },
            responseType: 'blob'}).then(response => {
            console.log(response);
            let url = URL.createObjectURL(response.data)
            this.images = [...this.images, {url: url, path: path}];
          }).catch(error => {
            console.warn(error)
            return error
          })
        })()
      } else{
        this.images = [...this.images];
      }
      console.log("Tries to load an image . Finds : "+this.images.find(element => element.path === path));
      this.currentImageIndex = this.images.findIndex(image => image.path === path);
      this.$refs.image.style.display = "block";
      this.imageUp = true;
    },
    //stack overflow shuffle code. https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle() {
      let currentIndex = this.cupSubmissions.length,  randomIndex;

      // While there remain elements to shuffle...
        while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.cupSubmissions[currentIndex], this.cupSubmissions[randomIndex]] = [
        this.cupSubmissions[randomIndex], this.cupSubmissions[currentIndex]];
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
  margin: auto auto 10px auto;
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
  min-width: 400px;
  background-color: #372F30;
  justify-content: space-around;
  color: white;
}

.rate {
  height: 100%;
  top:0;
  position: absolute;
}

#rate-main {
  left: 0;
  width: 100%;

}

#rate-left {
  display: flex;
  align-items: center;
  left: 0;
  width: 50%;
}

#rate-left:hover {
  cursor: pointer;
}

#rate-main span, #rate-main .circle {
  display: none;
}

#rate-left:hover span, #rate-left:hover .circle {
  display: block;
}

#rate-right:hover span, #rate-right:hover .circle {
  display: block;
}

#rate-right {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  right: 0;
  width: 50%;
}

.circle {
  background-color: white;
  border-radius: 50px;
  margin: 40px;
  padding: 5px;
  outline: 1px solid black;
}

#rate-right:hover {
  cursor: pointer;
}

#rate-right .circle:hover .material-icons{
  color: #0690DB;
}

#rate-left .circle:hover .material-icons{
  color: #d33c40;
}

</style>