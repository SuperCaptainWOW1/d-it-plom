<script setup>
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { onMounted, ref, watch } from "vue";

import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const props = defineProps({
  address: {
    type: String,
  },
});

const emit = defineEmits({
  addressChange: (address) => {
    if (typeof address === "string") {
      return true;
    } else {
      console.warn("Recieving address has failed");
      return false;
    }
  },
  showPanel: null,
});

const createdMarker = ref(null);
let addressPending = false;

onMounted(() => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoid293MSIsImEiOiJjazZ4dWhpZ3gwaGw3M21zNmI2aGI0MHAzIn0.3EVQozMg2pXtcj1wNJWRlA";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [37.618423, 55.751244], // starting center in [lng, lat]
    zoom: 11, // starting zoom
  });

  map.addControl(
    new MapboxLanguage({
      defaultLanguage: "ru",
    })
  );

  map.on("click", (e) => {
    if (userStore.type !== "creator") return;

    if (createdMarker.value) createdMarker.value.remove();

    // Empty address value to show loader
    emit("addressChange", "");

    createdMarker.value = new mapboxgl.Marker({
      color: "#60BA62",
    })
      .setLngLat([e.lngLat.lng, e.lngLat.lat])
      .addTo(map);

    addressPending = true;
    getLocationGeoData(e.lngLat).then((geoData) => {
      console.log(geoData);
      const dataElement = geoData.features[0];

      emit(
        "addressChange",
        dataElement.properties.address ||
          `${dataElement.text} ${dataElement.address || ""}`
      );

      addressPending = false;
    });

    emit("showPanel", "small");
  });
});

// Remove pin if address is empty
watch(
  () => props.address,
  (address) => {
    if (!address && !addressPending && createdMarker.value)
      createdMarker.value.remove();
  }
);

async function getLocationGeoData(lngLat) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?language=ru&access_token=${mapboxgl.accessToken}`
  );

  return await response.json();
}
</script>

<template>
  <div id="map" ref="map"></div>
</template>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
