<script setup></script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "@/assets/styles/reset.scss";
@import "@/assets/styles/abstracts.scss";

body {
  background-color: $body-background-color;
  font-family: "SfPro-R", sans-serif;
  color: $body-color;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2.4rem;
}
</style>
