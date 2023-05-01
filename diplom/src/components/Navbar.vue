<script setup>
import Menu from "./Menu.vue";
import Search from "./Search.vue";
</script>

<template>
  <div class="wrapper">
    <Menu />
    <Search />
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  padding: 1rem;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
</style>
