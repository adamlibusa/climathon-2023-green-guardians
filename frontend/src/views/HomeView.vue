<script setup>
import Map from "@/components/Map.vue";
import Header from "@/components/Header.vue";
import Todo from "@/components/Todo.vue";
import AlertList from "@/components/AlertList.vue";
import LocationDetailist from "@/components/LocationDetailist.vue";
import axios from "axios";
import { states } from "@/stateManager.js";
</script>
<template>
  <main>
    <div class="container">
      <Header></Header>
      <aside v-if="!states.currentDetailist" class="left-aside">
        <AlertList
          widgetTitle="Meterologické výstrahy"
          :alertObject="meteoObject"
        ></AlertList>
        <AlertList
          widgetTitle="Bratislavské vodárne"
          :alertObject="watersObject"
        ></AlertList>
      </aside>
      <Map @nodeClicked="openDetailist" class="map">map</Map>
      <LocationDetailist v-if="states.currentDetailist"></LocationDetailist>
      <aside class="right-aside">
        <Todo></Todo>
      </aside>
    </div>
  </main>
</template>
<script>
export default {
  components: {
    Map,
  },
  async mounted() {
    // make calls for alert lists
    // BVS
    let res = await axios.get("http://demo.climathon.sk:8080/bvsitems");
    let data = res.data;
    console.log(data);
    this.watersObject = data;

    let meteo = await axios.get("http://demo.climathon.sk:8080/weatheralerts");
    let mdata = meteo.data;
    console.log(mdata);
    this.meteoObject = mdata;
  },
  data() {
    return {
      grid: "auto 1fr auto",
      meteoObject: {},
      watersObject: {},
    };
  },
  methods: {
    openDetailist(e) {
      if (e) {
        states.currentDetailist = e;
        this.grid = "1fr auto auto";
      }
      // console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: v-bind(grid);
  grid-template-rows: auto 1fr;
}

.header {
  grid-column: 1/-1;
}
.left-aside {
  padding: 0 0 0 1.2rem;
  min-width: 30rem;
  max-width: 31rem;
  width: 100%;
}
.map {
}
.todo {
}

aside {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
</style>
