<script setup>
import NavbarMenu from "./NavbarMenu.vue";
import NavbarSearch from "./NavbarSearch.vue";
</script>

<template>
  <div class="wrapper">
    <NavbarMenu />
    <NavbarSearch />
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
