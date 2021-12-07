<template>
  <section>
    <header>
      <title>Upload Image</title>
    </header>
    <div class="dropArea" @drop.prevent="catchFile($event)" @dragover.prevent id="dropArea" @click="triggerInput">
      Click or Drop to add Image Here!
    </div>
    <input type="file" style="display: none" @change="catchFile($event)" ref="catchFile" accept="image/*">
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
  methods: {
    catchFile(event) {
      let files;
      //console.log(event);
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
      console.log(files[0]);
      axios.post('http://127.0.0.1:8081/api/image', formData
      ,{
        headers: {
          'Content-type':'image/*'
        }
      })
      .then(response => {
        if(response.status !== 200){
          alert("There was an error receiving the image.")
        }
        console.log(response);
      }).catch(error =>{
        console.log(error);
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
    margin: auto;
    border: dashed 2px darkgray;
    color: darkgray;
    padding: 5em;
  }
</style>