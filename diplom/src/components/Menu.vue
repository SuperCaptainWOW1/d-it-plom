<script setup>
import { ref } from "vue";

const isShowMenu = ref(false);
</script>

<template>
  <div v-if="isShowMenu" class="menu">
    <div class="profile-quick">
      <span class="name">Антоха</span>
      <img
        class="avatar"
        src="https://wwwimage-us.pplusstatic.com/thumbnails/photos/w136-q80/cast/ag_cast_antonystarr.jpg"
        alt=""
      />
    </div>
    <div class="menu-items"></div>
    <span class="back"></span>
  </div>

  <span @click="isShowMenu = !isShowMenu">
    <font-awesome-icon :icon="['fas', 'bars']" />
  </span>
</template>

<style scoped>
span {
  color: #60ba62;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
