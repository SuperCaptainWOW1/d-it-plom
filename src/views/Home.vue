<script setup>
import { ref } from "vue";
import BottomPanelStoreCreate from "../components/BottomPanelStoreCreate.vue";
import Map from "../components/Map.vue";
import Navbar from "../components/Navbar.vue";
import { useUserStore } from "../stores/user";

const creatingStoreAddress = ref("");
const panelMode = ref("");

const userStore = useUserStore();
</script>

<template>
  <Navbar />

  <Map
    :address="creatingStoreAddress"
    @address-change="(addressName) => (creatingStoreAddress = addressName)"
    @show-panel="(value) => (panelMode = value)"
  />

  <BottomPanelStoreCreate
    v-if="userStore.type === 'creator'"
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
