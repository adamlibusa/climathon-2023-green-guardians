<script setup>
import axios from "axios";
</script>
<template>
  <section :class="['shmu', `shmu--${shmuState}`]">
    <h3 class="shmu__title">Meteorologické Výstrahy</h3>
    <ul class="shmu__alerts">
      <li class="shmu__alert" v-for="(alert, index) in alerts" :key="index" @click="showDialog">
        <p>Type: {{ alert.type }}</p>
        <p>Lvl: {{ alert.level }}</p>
      </li>
    </ul>
  </section>
  <base-dialog @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-dialog>
</template>
<script>
import BaseDialog from '@/components/BaseDialog.vue'

export default {
  name: "Shmu",
  components: {BaseDialog},
  async mounted() {
    let res = await axios.get("http://demo.climathon.sk:8080/weatheralerts");
    let data = res.data;

    this.alerts = data.alerts;
    // this.shmuState = data.color;
    console.log(data);
  },
  data() {
    return {
      shmuState: "normal",
      alerts: [],
      dialogIsVisible: false,
    };
  },
  methods: {
    hideDialog() {
      this.dialogIsVisible = false
    },
    showDialog() {
      this.dialogIsVisible = true
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";
.shmu {
  padding: 1.8rem;
  border-radius: $border-radius-medium;
  // max-height: ;

  &--normal {
    background-color: $grey;
  }

  &--yellow {
    background-color: yellow;
  }

  &--red {
    background-color: red;
  }

  // SUBCOMPONENTS

  &__title {
    margin-bottom: 1.8rem;
  }

  &__alerts {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    // max-height: ;
  }
  &__alert {
    border-radius: $border-radius-small;
    background-color: $light-grey;
    padding: 0.6rem 1.2rem;
  }
}
</style>
