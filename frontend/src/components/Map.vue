<script setup>
import { states } from "@/stateManager.js";
import axios from "axios";
</script>
<template>
  <div class="map-container-fix">
    <button
      v-if="states.currentDetailist"
      @click="backButtonPushed"
      class="back-to-overview"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
import {states} from "@/stateManager.js";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmlsaXBzaXBvcyIsImEiOiJjbG8wZDM2ZjExN3Y4Mm5vNjFxYnA4Njd6In0.x14qxj7riqlzCaDX6Ru2ww";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        place: "Zochova",
        iconSize: [10, 10],
        urgency: "red",
      },
      geometry: {
        type: "Point",
        coordinates: [17.107457987237833, 48.147842015271344],
      },
    },
    {
      type: "Feature",
      properties: {
        place: "Bajkalska",
        iconSize: [10, 10],
        urgency: "red",
      },
      geometry: {
        type: "Point",
        coordinates: [17.145171, 48.156216],
      },
    },
    {
      type: "Feature",
      properties: {
        place: "Technicka",
        iconSize: [10, 10],
        urgency: "yellow",
      },
      geometry: {
        type: "Point",
        coordinates: [17.175404498150133, 48.17536042289632],
      },
    },
  ],
};

export default {
  // Initiate map on mount
  mounted() {
    // define map with it's props
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      // cahnge to mapbox://styles/mapbox/dark-v11 or mapbox://styles/mapbox/streets-v12
      style: "mapbox://styles/mapbox/dark-v11", // Replace with your preferred map style
      center: [17.112093796795413, 48.14790937045524],

      // initial zoom
      zoom: 12,

      // maximal zoom level (several streets)
      maxZoom: 16,

      // minimal zoom level (so that the user does not zoom out like crazy)
      minZoom: 12,

      maxBounds: [
        [16.979914536972792, 48.01510738724788], // Southwest coordinates
        [17.26658903380366, 48.25180105029992], // Northeast coordinates,
      ],
    });

    for (let marker of geojson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = "marker";

      // this will depend on other stuff
      switch (marker.properties.urgency) {
        case "normal":
          el.style.backgroundColor = `grey`;

          break;
        case "yellow":
          el.style.backgroundColor = `#fbbf24`;

          break;
        case "red":
          el.style.backgroundColor = `#b91c1c`;
          break;
        default:
          break;
      }

      // this is good
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";
      el.style.borderRadius = "10rem";

      el.addEventListener("click", () => {
        map.zoom > 14 ? map.setZoom(map.zoom) : "";
        map.flyTo({ center: marker.geometry.coordinates, zoom: 16 });
        // map.setZoom(15);

        // map.resize();

        this.$emit("nodeClicked", marker.properties.place);
      });

      // Add markers to the map.
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    }

    map.dragRotate.disable();
    this.map = map;
    // has to stay here, fixes the squishing
    // map.resize();
  },

  // Kill map on unmount
  unmounted() {
    this.map.remove();
    this.map = null;
  },
  methods: {
    async backButtonPushed() {
      // zoom out and center
      await this.map.flyTo({
        center: [17.112093796795413, 48.14790937045524],
        zoom: 12,
      });

      states.currentDetailist = undefined;
    },
  },
  emits: ["nodeClicked"],
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.map-container {
  flex: 1;
  height: 100%;
  width: 100%;
}

.map-container-fix {
  margin-left: 1.2rem;
  height: 100%;
  overflow: hidden;
  border-radius: $border-radius-medium;
  position: relative;
  width: 100%;
}

.back-to-overview {
  position: absolute;
  height: 4rem;
  width: 4rem;
  top: 1.4rem;
  left: 1.4rem;
  z-index: 50;
  border-radius: $border-radius-medium;
  color: $white;
  padding: 0.6rem;
  border: none;
  background-color: $black;
}
</style>
