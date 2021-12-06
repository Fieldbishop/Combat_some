<template>
  <div id="modalContainer" class="modal" @click="$emit('closeModal')">
    <slot v-if="modalId === 0" name="leaderboardsSlot"></slot>
    <slot v-if="modalId === 1" name="loginSlot"></slot>
    <slot v-if="modalId === 2" name="signupSlot"></slot>
    <slot v-if="modalId === 3" name="userSlot"></slot>
  </div>
</template>

<script>
export default {
  name: "ModalContainer",
  data() {
    return {

    }
  },
  props: {
    modalId: Number,

  },
  methods: {

  },

}
</script>

<style scoped>

</style>