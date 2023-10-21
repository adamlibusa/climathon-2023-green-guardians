<template>
  <div class="map-container-fix">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmlsaXBzaXBvcyIsImEiOiJjbG8wZDM2ZjExN3Y4Mm5vNjFxYnA4Njd6In0.x14qxj7riqlzCaDX6Ru2ww";

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

    this.map = map;

    // has to stay here, fixes the squishing
    map.resize();
  },

  // Kill map on unmount
  unmounted() {
    this.map.remove();
    this.map = null;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/abstracts.scss";

.map-container {
  flex: 1;
  height: 90vh;
  // width: 25rem;
}

.map-container-fix {
  height: 80vh;
  overflow: hidden;
  border-radius: $border-radius-medium;
}
</style>
