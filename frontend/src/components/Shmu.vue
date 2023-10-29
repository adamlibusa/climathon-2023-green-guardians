<script setup>
import axios from "axios";
import BaseChip from '@/components/UI/BaseChip.vue'
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
    <header class="detail-dialog__header">
      <h1 class="detail-dialog__title">{{ dialogData.subject }}</h1>
      <span class="detail-dialog__date">{{
        `From ${dialogData.from} to ${dialogData.to}`
      }}</span>
    </header>
    <p class="detail-dialog__description">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita minima
      repellendus unde, accusamus laudantium nisi mollitia quam quod pariatur
      nemo voluptatum ipsa sequi harum eaque inventore magnam dignissimos!
      Totam, itaque?
    </p>
    <div class="detail-dialog__involved-parties">
      <h4 class="detail-dialog__subtitle">Zapojené skupiny:</h4>
      <ul class="detail-dialog__parties-list">
        <li
            v-for="(party, index) in dialogData.involvedParties"
            :key="index"
        >
          <base-chip :class="`detail-dialog__party--${index + 1}`">
            {{ party.name }}
          </base-chip>
        </li>

        <li
          :class="[
            'detail-dialog__party',
            `detail-dialog__party--${index + 1}`,
          ]"
          v-for="(party, index) in dialogData.involvedParties"
          :key="index"
        >
          {{ party.name }}
        </li>
      </ul>
    </div>
    <div class="detail-dialog__tasks">
      <h4 class="detail-dialog__subtitle">Relevantné úlohy:</h4>
      <ul class="detail-dialog__tasks__list">
        <li
          v-for="(todo, index) in dialogData.recommendedTasks"
          :key="index"
          class="detail-dialog__tasks__task"
        >
          {{ todo.subject }}
        </li>
      </ul>
    </div>
    <!-- <button @click="closeShmuAlertDetailist">Close it!</button> -->
  </base-dialog>
</template>
<script>
import BaseDialog from "@/components/BaseDialog.vue";
import {apiServer} from "@/apiServer.js";


export default {
  name: "Shmu",
  components: { BaseDialog, BaseChip },
  async mounted() {
    let res = await axios.get(apiServer.baseUrl + "/weatheralerts");
    let data = res.data;

    this.alerts = data.items;
    // console.log();
    this.shmuState = data.highestLevel;
  },
  data() {
    return {
      shmuState: "normal",
      alerts: [],
      dialogIsVisible: false,
      dialogData: {},
    };
  },
  methods: {
    closeShmuAlertDetailist() {
      this.dialogIsVisible = false;
    },
    async openShmuAlertDetailist(_index) {
      // make an api call
      let res = await axios.post(
        `http://demo.climathon.sk:8080/weatheralertdetail?AlertId=${_index + 1}`
      );
      let data = res.data;

      this.dialogData = data;
      this.dialogIsVisible = true;
      console.log(data);
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

.detail-dialog {
  &__header {
    margin-bottom: 2.4rem;
  }
  &__title {
    font-size: 3rem;
  }
  &__date {
    color: $text-grey;
  }
  &__subtitle {
    margin-bottom: 1.2rem;
    color: $text-grey;
  }

  &__involved-parties {
    margin-bottom: 2.4rem;
  }
  &__parties-list {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
  }

  &__description {
    margin-bottom: 2.4rem;
  }
}
</style>
