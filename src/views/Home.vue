<script setup>
import { ref } from "vue";
import BottomPanelStoreCreate from "../components/BottomPanelStoreCreate.vue";
import BottomPanelStoreView from "../components/BottomPanelStoreView.vue";
import Map from "../components/Map.vue";
import Navbar from "../components/Navbar.vue";
import { useGlobalStore } from "../stores/global";
import { useUserStore } from "../stores/user";

const creatingStoreAddress = ref("");
const currentPlaceLng = ref(0);
const currentPlaceLat = ref(0);

const isShowPanel = ref(false);

const userStore = useUserStore();
const globalStore = useGlobalStore();
</script>

<template>
  <Navbar />

  <Map
    :address="creatingStoreAddress"
    @point-select="
      (pointData) => {
        creatingStoreAddress = pointData.address;
        currentPlaceLng = pointData.lng;
        currentPlaceLat = pointData.lat;
      }
    "
    @show-panel="isShowPanel = true"
  />

  <BottomPanelStoreView v-if="globalStore.selectedCompany !== null" />

  <BottomPanelStoreCreate
    v-else-if="userStore.type === 'creator'"
    :isShowPanel="isShowPanel"
    :address="creatingStoreAddress"
    :lng="currentPlaceLng"
    :lat="currentPlaceLat"
    @close="
      () => {
        isShowPanel = false;
        creatingStoreAddress = '';
        currentPlaceLng = 0;
        currentPlaceLat = 0;
      }
    "
    @change-panel-mode="(mode) => (panelMode = mode)"
  />
</template>

<style scoped></style>
