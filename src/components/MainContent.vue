<template>
  <div id="battle-content" class="content-container">
    <div class="cup-container">
      <div id="cup-image" class="image-container cup-content">
        <div v-if="loggedIn" id="test-main" class="test">
          <div @click="downVote" id="test-left" class="test"><h1>⇓</h1></div>
          <div @click="upVote" id="test-right" class="test"><h1>⇑</h1></div>
        </div>
        <img ref="image" src="../assets/test2.png" alt="winner photo" @load="imageLoaded">
      </div>
      <div v-if="imageUp" id="cup-string" class="cup-text cup-content">
        <h3 ref="name">Cup name</h3>
        <h4 ref="category">Cup category</h4>
        <h4 ref="time">01:02:22</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {
      imageUp: false,

    }
  },
  props: {
    loggedIn: Boolean,

  },
  methods: {
    upVote() {
      this.$emit('vote', 1);
      this.nextImage();
    },

    downVote() {
      this.$emit('vote', 0);
      this.nextImage();
    },

    nextImage() {
      this.$refs.image.style.display = "none";
      this.imageUp = false;
      this.$refs.image.src = "https://via.placeholder.com/" + Math.floor(Math.random() * (1500 - 150 + 1) + 150);
    },

    imageLoaded() {
      this.$refs.image.style.display = "block";
      this.imageUp = true;
    }
  },
  mounted() {
    this.$refs.image.src = "https://via.placeholder.com/" + Math.floor(Math.random() * (1500 - 150 + 1) + 150);
  }
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
  display: block;
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

#test-main h1 {
  display: none;
  margin: 50px;
}

#test-left:hover h1 {
  display: block;
}

#test-right:hover h1 {
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