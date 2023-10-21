<script setup>
import axios from "axios";
</script>
<template>
  <section :class="['shmu', `shmu--${shmuState}`]">
    <h3 class="shmu__title">Meteorologické výstrahy</h3>
    <ul class="shmu__alerts">
      <li
        @click="openShmuAlertDetailist(index)"
        :class="['shmu__alert', `shmu__alert--${alert.color}`]"
        v-for="(alert, index) in alerts"
        :key="index"
      >
        <p class="shmu__alert__type">{{ alert.type }}</p>
        <p>Lvl: {{ alert.level }}</p>
      </li>
    </ul>
  </section>
  <base-dialog @close="closeShmuAlertDetailist" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="closeShmuAlertDetailist">Close it!</button>
  </base-dialog>
</template>
<script>
import BaseDialog from "@/components/BaseDialog.vue";

export default {
  name: "Shmu",
  components: { BaseDialog },
  async mounted() {
    let res = await axios.get("http://demo.climathon.sk:8080/weatheralerts");
    let data = res.data;

    this.alerts = data.alerts;
    this.shmuState = data.highestLevel;
  },
  data() {
    return {
      shmuState: "normal",
      alerts: [],
      dialogIsVisible: false,
    };
  },
  methods: {
    closeShmuAlertDetailist() {
      this.dialogIsVisible = false;
    },
    openShmuAlertDetailist(_index) {
      this.dialogIsVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";
.shmu {
  padding: 1rem 1.8rem 1.8rem 1.8rem;
  border-radius: $border-radius-medium;
  background-color: $grey;

  @include urgency-classes;

  // SUBCOMPONENTS

  &__alerts {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-height: 14rem;
    overflow: scroll;
  }

  &__alert {
    border-radius: $border-radius-small;
    background-color: $light-grey;
    padding: 0.6rem 1.2rem;

    @include urgency-classes;

    &__type {
      font-family: "SfPro-M", sans-serif;
    }
  }
}
</style>
