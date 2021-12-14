<template>
  <section>
    <div class="dropContainer">
      <div class="leaderboards-header">
        <h3>Upload image</h3>
        <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
      </div>
      <div class="dropArea" @drop.prevent="catchFile($event)" @dragover.prevent id="dropArea" @click="triggerInput">
        Click or Drop to add Image Here!
      </div>
      <input type="file" style="display: none" @change="catchFile($event)" ref="catchFile" accept="image/*">
    </div>
  </section>
</template>

<script>
import Vue from 'vue';
import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader)
import axios from 'axios';
import FormData from 'form-data';
export default {
  name: 'ImageUploader',
  props: {
    battleId: Number,   //Halutun battlen ID
    username: String,   //Käyttäjän nimi
  },
  methods: {
    catchFile(event) {
      let files;
      if(typeof event.target.files != "undefined"){
        files = event.target.files;
      } else{
        files = event.dataTransfer.files;
      }
      if(!new RegExp('^image/*').test(files[0].type)){
        return  alert('Please give a valid file!');
      }
      let formData = new FormData();
      formData.append("image", files[0]);
      formData.append("battleId", this.battleId);
      formData.append("username", this.username);
      axios.post('http://127.0.0.1:8081/api/upload_file', formData
      ,{
        headers: {
          'Content-type':'image/*'
        }
      })
      .then(response => {
        if(response.status === 200){
          alert("Submission completed successfully.");
          axios.patch('http://localhost:8081/api/usersubs', {
            "token": document.cookie.split("token=")[1]
          })
          this.$emit("closeModal")
        } else if(response.status === 304){
          alert("You've already submitted a battle");
        }

      }).catch(error =>{
        if(error.response){
          console.log(error.response.data);
          if(error.response.data.hasOwnProperty('code')){
            if(error.response.data.code === "ER_DUP_ENTRY"){
              alert("You have already submitted an image to this battle.");
            }
          } else{
            console.log("unknown error response.No sql error response.");
          }
        } else{
          //TODO handle errors other than sql and log them or something else.
        }
      })
    },
    triggerInput(){
      this.$refs.catchFile.click();
    }
  }
};
</script>

<style scoped>
  .dropArea{
    width: 50%;

    border: dashed 2px #A39A92;
    color: #A39A92;
    padding: 5em;

  }

  .dropContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    background-color: #fefefe;
    margin: 5% auto 15% auto;
    padding-bottom: 20px;
    position: relative;
  }

  .leaderboards-header .close {
    top: 10px;
  }

  @media (max-width: 850px) {
    .dropArea {
      width: auto;
      margin-left: 25px;
      margin-right: 25px;
    }
  }

</style>