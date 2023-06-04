<script setup>
import { onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import NavbarMenu from "../components/NavbarMenu.vue";
import NavbarSearch from "../components/NavbarSearch.vue";

import { useGlobalStore } from "../stores/global";
import { useUserStore } from "../stores/user";

const isShowTitle = ref(true);

const globalStore = useGlobalStore();
const userStore = useUserStore();

const isVotesRecieved = ref(false);
const votesData = ref({});

async function getVotes() {
  await globalStore.getCompaniesVotes();
  await globalStore.getCategories();

  votesData.value = globalStore.companiesVotes.find(
    (cv) => cv.companyId === globalStore.selectedCompany.id
  );

  isVotesRecieved.value = true;
}

onMounted(async () => {
  await getVotes();
});

function isVoted(product) {
  return userStore.votedProducts.some((votedProduct) => {
    return (
      votedProduct.companyId === globalStore.selectedCompany.id &&
      votedProduct.categoryId === product.categoryId &&
      votedProduct.itemId === product.itemId
    );
  });
}

function vote(product) {
  if (isVoted(product)) {
    if (product.votesNumber - 1 === 0) {
      globalStore.removeVoteProduct(
        votesData.value,
        product.categoryId,
        product.itemId
      );
    } else {
      userStore.removeVotedProduct(product, globalStore.selectedCompany.id);

      globalStore.editVotesNumber(votesData.value, product, -1);
    }
  } else {
    userStore.addVotedProduct(product, globalStore.selectedCompany.id);

    globalStore.editVotesNumber(votesData.value, product, 1);
  }
}
</script>

<template>
  <div class="top-bar">
    <NavbarMenu />
    <div class="top-bar-title">
      <p v-if="isShowTitle">{{ globalStore.selectedCompany.name }}</p>
      <span>Заявки на продукты</span>
    </div>
    <NavbarSearch />
  </div>
  <div v-if="isVotesRecieved" class="companies-list">
    <div
      class="voted-product"
      v-for="product in votesData.products"
      :key="product.itemId"
    >
      <div
        class="voted-product-progress-bar"
        :style="{
          width:
            (product.votesNumber / globalStore.selectedCompany.votesNumber) *
              100 +
            '%',
        }"
      ></div>

      <p class="product-name">
        {{
          globalStore.getCategoryItem(product.categoryId, product.itemId).name
        }}
      </p>

      <div class="product-bottom">
        <p class="product-votes-progress">
          {{ product.votesNumber }} /
          {{ globalStore.selectedCompany.votesNumber }} человек
        </p>
        <button
          class="product-vote-button"
          @click.prevent="() => vote(product)"
        >
          {{ isVoted(product) ? "Отменить" : "Поддержать" }}
        </button>
      </div>
    </div>
  </div>
  <Loader v-else />

  <button class="add-request" @click="$router.push('/categories')">
    Добавить запрос
  </button>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px;
}

.top-bar-title {
  text-align: center;
}

.top-bar-title p {
  font-size: 1.4rem;
  font-weight: 500;
}

.top-bar-title span {
  font-size: 1.2rem;
}

.companies-list {
  margin: 0 32px;
}

button.add-request {
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

.voted-product {
  background-color: #84d586;
  position: relative;
  z-index: 0;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 17px;
}
.voted-product-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #60ba62;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: -1;
}
.product-name {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.product-votes-progress {
  color: #306531;
  font-weight: 600;
}

.product-vote-button {
  background-color: #fff;
  color: #000;
  padding: 0.4rem 0.8rem;
  border: none;
  box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
