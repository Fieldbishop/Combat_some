<template>
  <div id="submitPicture" class="cup-body">
    <div class="cup-info">
      <h3><b>Cup name</b></h3>
      <button class="close" type="button" @click="$emit('closeModal')">&times;</button>
      <h5>Theme</h5>
      <h5>01:23:45</h5>
    </div>
    <hr>
    <form class="cup-submit" @submit.prevent="onUpload">
      <input type="file" @change="onFileSelected">
      <div>
        <input type="submit" class="confirmButton" value="Upload">
        <button @click="$emit('closeModal')" class="cancelButton">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "JoinBattle",
  data() {
    return {
      selectedFile: null,

    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    onUpload() {
      console.log(this.selectedFile);
    },

  },

}
</script>

<style scoped>

.cup-body {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  width: auto;
  max-width: 400px;
  padding: 15px;
}

.cup-info {
  display: block;
  position: relative;
}

.cup-info .close {
  top: -10px;
}

.cup-submit {
  display: flex;
  flex-direction: column;
}

.cup-submit div {
  display: block;
  margin: 10px;
}

.cup-submit > input {
  margin: 25px;
}

</style>