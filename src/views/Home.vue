<script setup>
import { ref } from "vue";
import BottomPanel from "../components/BottomPanel.vue";
import Map from "../components/Map.vue";
import Navbar from "../components/Navbar.vue";

const creatingStoreAddress = ref("");
const panelMode = ref("");
</script>

<template>
  <Navbar />

  <Map
    :address="creatingStoreAddress"
    @address-change="(addressName) => (creatingStoreAddress = addressName)"
    @show-panel="(value) => (panelMode = value)"
  />

  <BottomPanel
    :address="creatingStoreAddress"
    @close="
      () => {
        panelMode = '';
        creatingStoreAddress = '';
      }
    "
    :panelMode="panelMode"
  />
</template>

<style scoped></style>
