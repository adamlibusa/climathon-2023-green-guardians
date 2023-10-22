<template>
  <header class="header">
    <h1 class="header__title">Dohľadové Centrum <base-chip :class="profileTypeClass" :big="true">{{ profileType }}</base-chip></h1>
    <p class="header__subtitle">01/01/2023</p>
  </header>
</template>
<script>
import BaseChip from '@/components/UI/BaseChip.vue'

export default {
  name: "Header",
  components: {BaseChip},
  computed: {
    profileType() {
      if (this.$route.path === '/dispatcher') {
        return 'Dispečer'
      } else {
        return 'Krízový manažér'
      }
    },
    profileTypeClass() {
      if (this.$route.path === '/dispatcher') {
        return 'dispatcher'
      } else {
        return 'crisis-manager'
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.header {
  padding: 2.4rem 3.6rem;
  margin-bottom: 2.4rem;
  &__title {
    font-size: 4rem;
    line-height: 1.1;
    letter-spacing: 1px;
  }
  &__subtitle {
    font-size: 1.8rem;
    font-family: "SfPro-B";
    color: $text-grey;
  }
}

h1 {
  display: flex;
  align-items: center;

  span {
    margin-inline-start: 12px;

    &.dispatcher {
      background-color: $basic-dark-grey;
    }

    &.crisis-manager {
      background-color: $primary-red;
    }
  }
}
</style>
