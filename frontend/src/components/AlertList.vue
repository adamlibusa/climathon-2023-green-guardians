<script setup>
import { states } from "@/stateManager.js";
import BaseDialog from "./BaseDialog.vue";
import axios from "axios";
import TodoForDetail from "@/components/TodoForDetail.vue";
</script>
<template>
  <section :class="['widget', `widget--${alertObject.highestLevel}`]">
    <h3 class="widget__title">{{ widgetTitle }}</h3>
    <span class="source">
      <a :href="`${alertObject.sourceUrl}`">
        {{ alertObject.highestLevel === "red" ? "SHMU" : "BVS" }}</a
      ></span
    >
    <ul class="widget__alerts">
      <li
        v-for="(alert, index) in alertObject.items"
        @click="openAlertDialog(index)"
        :key="index"
        :data-source="alertObject.sourceName"
        :class="[
          'widget__alerts__alert',
          `widget__alerts__alert--${alert.color}`,
        ]"
      >
        <div class="alert__header">
          <p class="alert__title">
            {{ alert.type }}
          </p>
          <p class="alert__level">Lvl: {{ alert.level }}</p>
        </div>
        <p v-if="alert.duration" class="alert__from-to">{{ alert.duration }}</p>
        <p v-if="alert.location" class="alert__location">
          {{ alert.location }}
        </p>
        <p v-if="alert.dateOfPublication" class="alert__date">
          publikované {{ alert.dateOfPublication }}
        </p>
      </li>
    </ul>
  </section>
  <BaseDialog :open="states.currentDialog">
    <header class="detail-dialog__header">
      <h1 class="detail-dialog__title">{{ states.currentDialog.subject }}</h1>

      <span class="detail-dialog__date">{{
        `From ${states.currentDialog.from.slice(
          0,
          -3
        )} to ${states.currentDialog.to.slice(0, -3)}`
      }}</span>
    </header>
    <p class="detail-dialog__description">
      {{ states.currentDialog.text }}
    </p>

    <div class="detail-dialog__involved-parties">
      <h4 class="detail-dialog__subtitle">Zapojené skupiny:</h4>
      <ul class="detail-dialog__parties-list">
        <li
          :class="[
            'detail-dialog__party',
            `detail-dialog__party--${index + 1}`,
          ]"
          v-for="(party, index) in states.currentDialog.involvedParties"
          :key="index"
        >
          {{ party.name }}
        </li>
      </ul>
    </div>

    <div class="detail-dialog__tasks">
      <TodoForDetail />
    </div>
  </BaseDialog>
</template>
<script>
import {apiServer} from "@/apiServer.js";

export default {
  name: "AlertList",
  props: {
    widgetTitle: String,
    alertObject: Object,
  },
  data() {
    return {
      sectionState: "normal",
      alerts: [],
      dialogIsVisible: false,
      dialogData: {},
    };
  },
  methods: {
    async openAlertDialog(index) {
      let res = await axios.post(
        apiServer.baseUrl + `/weatheralertdetail?AlertId=${index + 1}`
      );
      let data = res.data;
      states.currentDialog = data;
    },
  },
};
</script>
<style lang="scss" scpoed>
@import "@/assets/styles/abstracts.scss";
.widget {
  position: relative;
  padding: 1rem 1.8rem 1.8rem 1.8rem;
  @include urgency-classes;
  border-radius: $border-radius-medium;
  background-color: $grey;
  @include urgency-classes;

  &__alerts {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-height: 14rem;
    overflow-y: scroll;

    &__alert {
      border-radius: $border-radius-small;
      background-color: $light-grey;
      padding: 0.6rem 1.2rem;
      @include urgency-classes;
      cursor: pointer;
      .alert__header {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        // background-color: ;
      }
      .alert__date,
      .alert__location,
      .alert__from-to {
        font-size: 1.2rem;
      }

      .alert__from-to,
      .alert__date {
        color: #a1a1aa;
      }
      .alert__title {
        font-family: "SfPro-M", sans-serif;
        letter-spacing: 1px;
      }
      .alert__level {
        font-size: 1.4rem;

        letter-spacing: 1px;
      }
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
    color: $text-light-grey;
  }
  &__subtitle {
    margin-bottom: 1.2rem;
    color: $text-light-grey;
  }

  &__involved-parties {
    margin-bottom: 2.4rem;
  }
  &__parties-list {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;
  }
  &__party {
    border-radius: $border-radius-large;
    font-family: "SfPro-B", sans-serif;
    letter-spacing: 0.5px;
    padding: 0.2rem 1rem;
    font-size: 1.4rem;
    color: white;
    // border: 2px solid rgba($text-grey, 0.7);
    @include party-coloring;
    // background-color: rgba($text-grey, 0.5);
    // color: $black;
  }

  &__description {
    margin-bottom: 2.4rem;
  }
}
.source {
  position: absolute;
  right: -1rem;
  top: -1rem;
  background-color: #39393f;
  padding: 0.2rem 1rem;
  border-radius: 10rem;
  font-size: 1.4rem;
}
</style>
