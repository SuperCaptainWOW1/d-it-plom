<script setup>
import { onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import NavbarMenu from "../components/NavbarMenu.vue";
import NavbarSearch from "../components/NavbarSearch.vue";

import { useGlobalStore } from "../stores/global";

const isShowTitle = ref(true);

const globalStore = useGlobalStore();
const isVotesRecieved = ref(false);

async function getVotes() {
  await globalStore.getCompaniesVotes();

  isVotesRecieved.value = true;
}

onMounted(() => {
  globalStore.getCategories();
  globalStore.getCompaniesVotes();
});
</script>

<template>
  <div class="top-bar">
    <NavbarMenu />
    <p v-if="isShowTitle">{{ props.name }}</p>
    <p>Мои заявки</p>
    <NavbarSearch />
  </div>
  <div v-if="isVotesRecieved" class="companies-list">
    <div
      class="voted-product"
      v-for="vote in globalStore.getCompaniesVotes()"
      :key="vote.itemId"
    >
      {{ globalStore.getCategoryItem(vote.categoryId, vote.itemid).name }}

      {{ vote.votesNumber }} / {{ globalStore.selectedCompany.votesNumber }}
    </div>
  </div>
  <Loader v-else />

  <button @click="">Добавить запрос</button>
</template>

<style scoped>
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
</style>
