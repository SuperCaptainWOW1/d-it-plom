import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: useLocalStorage("user/login", ""),
    type: useLocalStorage("user/type", ""), // "creator" | "user"
  }),
  actions: {
    login(user) {
      this.username = user.username;
      this.type = user.type;
    },
    logout() {
      this.username = "";
      this.type = "";
    },
  },
});
