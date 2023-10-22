<script setup>
import { states } from "@/stateManager.js";
</script>

<template>
  <transition-group name="modal">
    <div
      v-if="open"
      class="backdrop"
      @click="states.currentDialog = undefined"
    ></div>
    <dialog open v-if="open">
      <slot></slot>
    </dialog>
  </transition-group>
</template>

<script>
export default {
  name: "BaseDialog",
  props: ["open"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.041);
  backdrop-filter: blur(5px);
  // transition: all $animation--time-medium;
}

dialog {
  max-width: 45%;
  color: $white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: $border-radius-medium;
  padding: 3.6rem;
  background-color: $grey;
  z-index: 100;
  border: none;
  /* animation: modal 0.3s ease-out forwards; */
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    // transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    // transform: translateY(0) scale(1);
  }
}
</style>
