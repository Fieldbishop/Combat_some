<template>
  <div id="battle-content" class="content-container">
    <div class="cup-container">
      <div id="cup-image" class="image-container cup-content">
        <img id="showcase_photo" src="../assets/test.png" alt="winner photo">
      </div>
      <div id="cup-string" class="cup-text cup-content">
        <h3>Cup name</h3>
        <h4>Cup category</h4>
        <h4>01:02:22</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {

    }
  },
  props: {
    loggedIn: Boolean,

  },
  methods: {

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
  height: auto;
  border: 1px solid #111111;
  max-height: 640px;
  display: block;
  margin-bottom: 10px;
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

</style>