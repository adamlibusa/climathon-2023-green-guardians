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
        <div class="image_wrapper">
          <span class="source">SITA</span>
          <img
            class="random_image"
            src="https://cdn.discordapp.com/attachments/915236393108787230/1165599249367580762/image.png?ex=65476fe4&is=6534fae4&hm=94202078d79872011ae3be40483f81a12a1f2c76b655910214508a9b8838ef8c&"
            alt=""
          />
        </div>
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
import {apiServer} from "@/apiServer.js";

export default {
  components: {
    Map,
  },
  async mounted() {
    // make calls for alert lists
    // BVS
    let res = await axios.get(apiServer.baseUrl + "/bvsitems");
    let data = res.data;
    console.log(data);
    this.watersObject = data;

    let meteo = await axios.get(apiServer.baseUrl + "/weatheralerts");
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
@import "@/assets/styles/abstracts.scss";

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
  padding-bottom: 1.4rem;
}

.image_titler {
  text-transform: uppercase;
  position: absolute;
  top: -1rem;
  right: -1rem;
  background-color: #39393f;
  color: white;
  padding: 0.2rem 1rem;
  border-radius: 10rem;
  font-size: 1.4rem;
}

.image_wrapper {
  position: relative;
}
.random_image {
  border-radius: $border-radius-medium !important;
}
</style>
