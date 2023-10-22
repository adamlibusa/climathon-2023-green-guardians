<template>
  <canvas height="120px" width="200px" id="precChart"></canvas>
</template>
<script>
import { Chart } from "chart.js/auto";
// import tempData from "../tempData.js";
export default {
  name: "Precipitation",
  data() {
    return {
      tempData: {
        type: "bar",
        data: {
          labels: [
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
          ],
          datasets: [
            {
              label: "Number of Moons",
              data: [0, 22, 11, 22, 33, 12, 3, 15, 44, 55],
              // background: "linear-gradient(blue white)",
              fill: true,
              borderColor: "red",
              borderWidth: 3,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          responsive: true,
          lineTension: 0,
          scales: {
            milimeters: [
              {
                title: {
                  display: true,
                },
              },
            ],
          },
        },
      },
    };
  },

  async mounted() {
    const ctx = document.getElementById("precChart");
    new Chart(ctx, this.tempData);
  },
  components: { Chart },
};
</script>
<style lang="scss" scoped>
#precChart {
  height: 10rem;
  width: 10rem;
}
</style>
