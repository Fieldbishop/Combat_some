<template>
  <div id="join-battle" @click="$emit('modal', 0)">
    <h3>BATTLE NOW</h3>
  </div>
</template>

<script>
export default {
  name: "BattlePopup"
}
</script>

<style scoped>
#join-battle {
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);

  background-color: #0ae494;
  border: 1px solid #111111;
  padding-right: 25px;
  padding-left: 25px;
  text-align: center;
  border-radius: 25px;
}

#join-battle:hover {
  cursor: pointer;
  background-color: #04AA6D;
  color: white;
}
</style>