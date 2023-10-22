<script setup></script>
<template>
  <canvas id="tempChart"></canvas>
</template>
<script>
import { Chart } from "chart.js/auto";
import tempData from "../tempData.js";

export default {
  name: "TempChart",
  data() {
    return {
      tempData: tempData,
    };
  },
  mounted() {
    const ctx = document.getElementById("tempChart");
    new Chart(ctx, this.tempData);
  },
  components: { Chart },
};
</script>

<style lang="scss"></style>
