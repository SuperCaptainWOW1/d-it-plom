<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "../components/Loader.vue";
import NavbarMenu from "../components/NavbarMenu.vue";
import NavbarSearch from "../components/NavbarSearch.vue";

import { useGlobalStore } from "../stores/global";

const router = useRouter();

const isShowTitle = ref(true);

const globalStore = useGlobalStore();
const isCompaniesRecieved = ref(false);

async function getCompanies() {
  await globalStore.getCompanies();

  isCompaniesRecieved.value = true;
}

onMounted(() => {
  getCompanies();
});

function selectCompany(id) {
  globalStore.selectCompany(id);
  router.push("/");
}
</script>

<template>
  <div class="top-bar">
    <NavbarMenu />
    <p v-if="isShowTitle">Мои магазины</p>
    <NavbarSearch />
  </div>
  <div v-if="isCompaniesRecieved" class="companies-list">
    <div
      v-if="globalStore.companies.length"
      class="company-item"
      v-for="company in globalStore.companies"
      :key="company.id"
      @click="() => selectCompany(company.id)"
    >
      <!-- <img src="" alt=""> -->
      <p class="company-name">{{ company.name }}</p>
      <p class="company-address">{{ company.address }}</p>
    </div>
    <p class="message empty-list" v-else>Список магазинов пуст</p>
  </div>
  <Loader v-else />

  <button @click="$router.push('/')">Добавить предприятие</button>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.companies-list {
  padding: 0 1rem;
  /* margin-top: 1rem; */
  padding-top: 1rem;
  overflow-y: auto;
  height: calc(100vh - 5rem);
  width: 100%;

  position: absolute;
  bottom: 1rem;
}

.company-item {
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.company-name {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

button {
  border: none;
  border-radius: 8px;
  padding: 6px;
  background-color: #60ba62;
  color: #fff;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  margin: 0 2rem;
  width: calc(100% - 4rem);
  cursor: pointer;

  position: absolute;
  bottom: 1rem;
}

.message.empty-list {
  text-align: center;
  color: #858585;
}

/* W3C standard
   сейчас только для Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #60ba62 #fff;
}

/* для Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-track {
  background: #fff;
}
*::-webkit-scrollbar-thumb {
  background-color: #60ba62;
  border-radius: 5px;
}
</style>
