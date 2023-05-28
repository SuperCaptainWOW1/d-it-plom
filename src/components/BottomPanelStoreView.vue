<script setup>
import { ref } from "vue";
import { useGlobalStore } from "../stores/global";
import { useUserStore } from "../stores/user";

const globalStore = useGlobalStore();
const userStore = useUserStore();

const props = defineProps({
  company: {
    name: String,
    address: String,
    votesNumber: Number,
    lng: Number,
    lat: Number,
  },
});

const votesNumber = ref(globalStore.selectedCompany.votesNumber);
</script>

<template>
  <Transition name="slide">
    <div class="store-view-block">
      <p class="title">{{ globalStore.selectedCompany.name }}</p>
      <p class="address">{{ globalStore.selectedCompany.address }}</p>

      <p class="products-number">500 продуктов</p>

      <template v-if="userStore.type !== 'creator'">
        <p class="votes-number">
          {{ globalStore.selectedCompany.votesNumber }} заявок
        </p>
        <button class="vote">Голосовать</button>
      </template>

      <template v-else>
        <input
          v-model="votesNumber"
          type="number"
          class="votes-number-edit"
          placeholder="Максимальное коль-во заявок"
        />

        <button class="vote">Сохранить</button>
      </template>
    </div>
  </Transition>
</template>

<style scoped>
.store-view-block {
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 34px 34px 0 0;
  padding: 2.5rem 2rem;
  z-index: 10;
  transition: 0.2s;
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  bottom: -10%;
  opacity: 0;
}

.title {
  font-weight: 600;
  font-size: 1.8rem;
}

.products-number,
.votes-number {
  font-size: 1.2rem;
}
.votes-number,
.products-number {
  margin-bottom: 1rem;
}

.products-number {
  padding-top: 1rem;
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
}

.votes-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #60ba62;
}

.votes-number-edit {
  border: none;
  border-bottom: 2px solid #60ba62;
  padding: 0.2rem;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

.votes-number-edit:focus {
  outline: 2px solid rgba(96, 186, 98, 0.6);
  border-bottom: 2px solid transparent;
}
</style>
