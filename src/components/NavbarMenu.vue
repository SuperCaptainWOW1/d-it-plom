<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const router = useRouter();

const isShowMenu = ref(false);

function quit() {
  userStore.logout();
  router.push("/auth");
}
</script>

<template>
  <span class="open-menu-button" @click="isShowMenu = true">
    <font-awesome-icon :icon="['fas', 'bars']" />
  </span>

  <div v-if="isShowMenu" class="menu">
    <div class="profile-quick">
      <span class="name">Антоха</span>
      <div class="avatar"></div>
    </div>

    <p
      v-if="userStore.type === 'creator'"
      class="open-list-button"
      @click="$router.push('/companies')"
    >
      Ваши магазины
    </p>
    <p
      v-else-if="userStore.type === 'user'"
      class="open-list-button"
      @click="gog"
    >
      Ваши заявки
    </p>

    <div class="bottom-part">
      <button @click="quit">Выйти</button>

      <span
        v-if="isShowMenu"
        class="close-menu-button"
        @click="isShowMenu = false"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.menu {
  background-color: #60ba62;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0 34px 34px 0;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
}
.open-menu-button {
  color: #60ba62;
  font-size: 1.5rem;
  cursor: pointer;
}

.close-menu-button {
  color: #306531;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
}

.profile-quick {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.name {
  margin-right: 2rem;
}

.avatar {
  height: 32px;
  width: 32px;
  background-position: center -50px;
  background-repeat: no-repeat;
  background-image: url("https://wwwimage-us.pplusstatic.com/thumbnails/photos/w136-q80/cast/ag_cast_antonystarr.jpg");
  border-radius: 50%;
}

.open-list-button {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.bottom-part {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.bottom-part button {
  border: none;
  border-radius: 8px;
  padding: 0 10px;
  background-color: #fff;
  color: #60ba62;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
