<script setup>
import axios from "axios";
</script>
<template>
  <section :class="['shmu', `shmu--${shmuState}`]">
    <h3 class="shmu__title">Meteorologické Výstrahy</h3>
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
</template>
<script>
export default {
  name: "Shmu",
  async mounted() {
    let res = await axios.get("http://demo.climathon.sk:8080/weatheralerts");
    let data = res.data;

    this.alerts = data.alerts;
    this.shmuState = data.highestLevel;
    console.log(data.alerts.highestLevel);
  },
  methods: {
    openShmuAlertDetailist(index) {
      console.log(index);
    },
  },
  data() {
    return {
      shmuState: "normal",
      alerts: [],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";
.shmu {
  padding: 1.8rem;
  border-radius: $border-radius-medium;
  // max-height: ;
  background-color: $grey;

  &--normal {
    background-color: $grey;
  }

  &--yellow {
    background-color: yellow;
  }

  &--red {
    border-left: 4px solid #b91c1c;
  }

  // SUBCOMPONENTS

  &__title {
    margin-bottom: 1.8rem;
  }

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

    &--normal {
      background-color: $grey;
    }

    &--yellow {
      border-left: 4px solid #fbbf24;
    }

    &--red {
      border-left: 4px solid #b91c1c;
    }

    &__type {
      font-family: "SfPro-M", sans-serif;
    }
  }
}
</style>
