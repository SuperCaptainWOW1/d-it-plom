<script setup>
import { ref, watch } from "vue";

const isSearchActive = ref(false);

const searchInputElement = ref(null);
function searchOnClick() {
  isSearchActive.value = !isSearchActive.value;
}

watch([searchInputElement], ([searchInputElement]) => {
  if (isSearchActive.value) searchInputElement.focus();
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isSearchActive" class="input-wrapper">
      <input
        ref="searchInputElement"
        @blur="isSearchActive = false"
        type="text"
      />
    </div>
  </Transition>
  <span @click="searchOnClick" :class="{ close: isSearchActive }">
    <font-awesome-icon
      v-if="!isSearchActive"
      :icon="['fas', 'magnifying-glass']"
    />
    <font-awesome-icon v-else :icon="['fas', 'times']" />
  </span>
</template>

<style scoped>
.input-wrapper {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.4rem;
  border-radius: 10px;
}
input {
  border: none;
  border-bottom: 2px solid #60ba62;
  background-color: transparent;
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: center;
}

input:focus {
  outline: none;
}

span {
  color: #60ba62;
  font-size: 1.5rem;
  cursor: pointer;
}

span.close {
  color: rgb(235, 81, 81);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
