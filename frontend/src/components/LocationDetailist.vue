<script setup>
import TempChart from "@/components/TempChart.vue";
import { states } from "@/stateManager.js";
import Precipitation from "./Precipitation.vue";
</script>
<template>
  <section>
    <p class="toptitle">Detail lokácie:</p>
    <h3>{{ states.currentDetailist }}</h3>
    <div class="charts">
      <div class="cont">
        <TempChart></TempChart>
      </div>
      <div class="cont">
        <Precipitation></Precipitation>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "LocationDetailist",
  mounted() {
    // call api that fetches the info about the place
  },
  components: { TempChart },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

section {
  margin-left: 1.2rem;
  min-width: 45rem;
  padding: 1.8rem;
  background-color: $grey;
  border-radius: $border-radius-medium;

  .toptitle {
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: "SfPro-B", sans-serif;
    letter-spacing: 1px;
    line-height: 1;
    color: $text-grey;
  }
  h3 {
    font-size: 3.6rem;
  }

  .charts {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
}
</style>
