<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const username = ref("");
const password = ref("");
const isValidationError = ref(false);

const userStore = useUserStore();

const router = useRouter();

function authorize(e) {
  e.preventDefault();

  console.log(username, password);

  if (username.value === "creator" && password.value === "cool") {
    isValidationError.value = false;

    userStore.setUser({ username: username.value, type: "creator" });

    router.push("/");
  } else if (username.value === "user" && password.value === "123") {
    isValidationError.value = false;

    userStore.setUser({ username: username.value, type: "user" });

    router.push("/");
  } else {
    isValidationError.value = true;
  }
}
</script>

<template>
  <form class="wrapper" @submit="authorize">
    <div class="auth">
      <p class="auth-title">Авторизация</p>
      <input
        :class="{ error: isValidationError }"
        v-model="username"
        type="text"
        placeholder="Имя пользователя"
      />
      <input
        :class="{ error: isValidationError }"
        v-model="password"
        type="password"
        placeholder="Пароль"
      />
    </div>
    <button class="auth-button" type="submit">Войти</button>
  </form>
</template>

<style scoped>
.wrapper {
  background-color: #e9ffe9;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
}

.auth-title {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #60ba62;
}

input {
  margin-bottom: 1rem;
  border: 1px solid #60ba62;
  padding: 0.2rem;
  border-radius: 4px;
}

input:focus {
  outline: 2px solid rgba(96, 186, 98, 0.6);
}

input.error {
  border: 1px solid #d35353;
}

.auth-button {
  background-color: #60ba62;
  color: #fff;
  border: none;
  padding: 0.3rem;
  width: 150px;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
