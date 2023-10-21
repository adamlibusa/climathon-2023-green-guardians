<script setup>
import Map from "@/components/Map.vue";
</script>
<template>
  <main>
    <div class="container">
      <header class="header">
        <h1>Header Title</h1>
      </header>
      <aside class="left-aside">
        <section class="shmu">vsmu</section>
      </aside>
      <Map class="map">map</Map>
      <section class="todo">todo</section>
      <div class="btn-row">
        <button class="btn btn--red btn--medium">Medium Red Primary</button>
        <button class="btn btn--secondary btn--medium">Medium Red Secondary</button>
        <button class="btn btn--green btn--medium">Medium Green Primary</button>
      </div>
      <div class="btn-row">
        <button class="btn btn--red btn--big">Big Red Primary</button>
        <button class="btn btn--secondary btn--big">Small Red Secondary</button>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  components: {
    Map,
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "header header header"
    "left-aside map todo";
}

.header {
  grid-area: header;
}
.left-aside {
  grid-area: left-aside;
}
.map {
  grid-area: map;
}
.todo {
  grid-area: todo;
}
</style>
