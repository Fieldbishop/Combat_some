<template>
  <div id="battle-content" class="content-container">
    <div id="vittusaatana" class="image-container">
      <img id="showcase_photo" src="../assets/consept3_etusivu.png" alt="winner photo">
    </div>
    <div class="cup-container">
      <h3>Test</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent"
}

window.onload = () => {
  document.getElementById("vittusaatana").style.height = String(document.getElementById("showcase_photo").offsetHeight + "px");
}

</script>

<style scoped>

.content-container {
  height: 100%;
  padding: 0.5rem 0.5rem 64px;
}

.image-container {
  margin: 2% auto 1% auto;
  border: 1px solid #111111;
  width: 60%;
  height: auto;
}

.image-container img{
  width: 100%;
  height: auto;
}

</style>