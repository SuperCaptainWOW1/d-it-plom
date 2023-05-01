<script setup>
import { ref } from "vue";
import BottomPanelStoreCreate from "../components/BottomPanelStoreCreate.vue";
import Map from "../components/Map.vue";
import Navbar from "../components/Navbar.vue";
import { useUserStore } from "../stores/user";

const creatingStoreAddress = ref("");
const isShowPanel = ref(false);

const userStore = useUserStore();
</script>

<template>
  <Navbar />

  <Map
    :address="creatingStoreAddress"
    @address-change="(addressName) => (creatingStoreAddress = addressName)"
    @show-panel="isShowPanel = true"
  />

  <BottomPanelStoreCreate
    v-if="userStore.type === 'creator'"
    :isShowPanel="isShowPanel"
    :address="creatingStoreAddress"
    @close="
      () => {
        isShowPanel = false;
        creatingStoreAddress = '';
      }
    "
    @change-panel-mode="(mode) => (panelMode = mode)"
  />
</template>

<style scoped></style>
