<template>
  <header class="header">
    <h1 class="header__title">Dohľadové Centrum</h1>
    <p class="header__subtitle">01/01/2023</p>
  </header>
</template>
<script>
export default {
  name: "Header",
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.header {
  padding: 2.4rem;
  &__title {
    font-size: 4rem;
    line-height: 1.1;
    // font-family: "SfPro-M";
    letter-spacing: 1px;
  }
  &__subtitle {
    font-size: 1.8rem;
    font-family: "SfPro-B";
    color: $text-grey;
  }
}
</style>
