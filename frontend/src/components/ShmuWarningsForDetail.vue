<script setup>
</script>

<template>
  <section :class="['shmu', `shmu--${shmuState}`]">
    <h3 class="shmu__title">Meteorologické výstrahy</h3>
    <ul class="shmu__alerts">
      <li
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
  name: "ShmuWarningsForDetail",
  props: ['shmuState', 'alerts']
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";
.shmu {
  padding: 1rem 1.8rem 1.8rem 1.8rem;
  border-radius: $border-radius-medium;

  // These things are different from styles in AlertList
  background-color: $grey;
  margin-block: 12px;
  border-block: solid 2px $light-grey;

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
