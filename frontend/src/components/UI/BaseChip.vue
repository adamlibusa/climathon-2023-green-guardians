<template>
  <span :class="['chip', cssClass, big ? 'big' : '']">
    <slot />
  </span>
</template>

<script>
export default {
  name: "BaseChip",
  props: ['cssClass', 'big'],
  mounted() {
    console.log(this.props)
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";
.chip {
  border-radius: $border-radius-large;
  font-family: "SfPro-B", sans-serif;
  letter-spacing: 0.5px;
  padding: 0.2rem 0.8rem;
  font-size: 1.4rem;
  color: white;
  // border: 2px solid rgba($text-grey, 0.7);
  //@include party-coloring;
  // background-color: rgba($text-grey, 0.5);
  // color: $black;

  &.big {
    font-size: 2rem;
    letter-spacing: 0.7px;
    padding: 0.4rem 1.2rem;
  }
}
</style>
