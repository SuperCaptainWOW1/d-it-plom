<script setup>
import { onMounted, ref } from "vue";
import Loader from "../components/Loader.vue";
import NavbarSearch from "../components/NavbarSearch.vue";

import { useGlobalStore } from "../stores/global";
import { useUserStore } from "../stores/user";

import { useRouter } from "vue-router";

const router = useRouter();

const isShowTitle = ref(true);
const globalStore = useGlobalStore();
const userStore = useUserStore();

const isItemsRecieved = ref(false);
const activeCategoryId = ref(null);
const activeCategoryItemId = ref(null);

onMounted(async () => {
  await globalStore.getCategories();

  isItemsRecieved.value = true;
});

function goBack() {
  if (activeCategoryId.value) {
    activeCategoryId.value = null;
    activeCategoryItemId.value = null;
  } else router.push(`/votes/${globalStore.selectedCompany.id}`);
}

function isVoted() {
  console.log(
    userStore.votedProducts,
    activeCategoryId.value,
    activeCategoryItemId.value
  );
  return userStore.votedProducts.some(
    (votedProduct) =>
      votedProduct.companyId === globalStore.selectedCompany.id &&
      votedProduct.categoryId === activeCategoryId.value &&
      votedProduct.itemId === activeCategoryItemId.value
  );
}

async function addVote() {
  const selectedCompanyVote = globalStore.companiesVotes.find(
    (vote) => vote.companyId === globalStore.selectedCompany.id
  );

  const isAlreadyCreated = globalStore.companiesVotes
    .find((cv) => cv.companyId === globalStore.selectedCompany.id)
    .products.some(
      (p) =>
        p.categoryId === activeCategoryId.value &&
        p.itemId === activeCategoryItemId.value
    );

  console.log(
    activeCategoryId.value,
    activeCategoryItemId.value,
    isAlreadyCreated,
    !isVoted()
  );

  if (
    activeCategoryId.value &&
    activeCategoryItemId.value &&
    isAlreadyCreated
  ) {
    if (!isVoted()) {
      // Edit existing one
      await globalStore.editVotesNumber(
        selectedCompanyVote,
        {
          categoryId: activeCategoryId.value,
          itemId: activeCategoryItemId.value,
        },
        1
      );

      userStore.addVotedProduct(
        {
          categoryId: activeCategoryId.value,
          itemId: activeCategoryItemId.value,
        },
        globalStore.selectedCompany.id
      );
    } else {
      router.push("/votes");
    }
  } else {
    // Add new one
    await globalStore.addVoteProduct(
      selectedCompanyVote,
      activeCategoryId.value,
      activeCategoryItemId.value
    );

    userStore.addVotedProduct(
      {
        categoryId: activeCategoryId.value,
        itemId: activeCategoryItemId.value,
      },
      globalStore.selectedCompany.id
    );
  }

  router.push("/votes");
}
</script>

<template>
  <div class="top-bar">
    <font-awesome-icon
      @click="goBack"
      class="back"
      :icon="['fas', 'chevron-left']"
    />

    <div class="top-bar-title">
      <p v-if="isShowTitle">{{ globalStore.selectedCompany.name }}</p>
      <span>Выберите категорию</span>
    </div>
    <NavbarSearch />
  </div>
  <template v-if="isItemsRecieved">
    <div v-if="!activeCategoryId" class="categories-list">
      <div
        class="category"
        v-for="category in globalStore.categories"
        @click="activeCategoryId = category.id"
      >
        <img :src="`/categories/${category.imgsrc}`" :alt="category.imgsrc" />
        <p class="category-name">{{ category.name }}</p>
      </div>
    </div>

    <div v-else class="category-items-list">
      <div
        class="category-item"
        v-for="categoryItem in globalStore.categories[activeCategoryId - 1]
          .items"
        @click="activeCategoryItemId = categoryItem.id"
        :class="{ active: activeCategoryItemId === categoryItem.id }"
      >
        <img :src="categoryItem.imgsrc" :alt="categoryItem.imgsrc" />
        <p class="category-name">{{ categoryItem.name }}</p>
      </div>
    </div>
  </template>
  <Loader v-else />

  <button
    v-if="activeCategoryId && activeCategoryItemId"
    class="add-request"
    @click="addVote"
  >
    Добавить запрос
  </button>
</template>

<style scoped>
.back {
  color: #60ba62;
  font-size: 1.5rem;
}
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

.categories-list,
.category-items-list {
  margin: 0 32px;
}

.categories-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.category {
  text-align: center;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 7px;
  border-radius: 15px;
  aspect-ratio: 1 / 1;
  /* max-width: 180px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  position: relative;
}

.category img {
  width: 90%;
}

.category-items-list {
  display: flex;
  flex-direction: column;
}

.category-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 15px;
  font-weight: 500;
}

.category-item:not(:last-child) {
  margin-bottom: 14px;
}

.category-item img {
  max-width: 30%;
}

.category-item.active {
  background: #60ba62;
  color: #fff;
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

  position: fixed;
  bottom: 1rem;
}
</style>
