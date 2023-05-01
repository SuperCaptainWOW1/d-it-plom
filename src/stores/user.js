import { defineStore } from "pinia";

export const useAlertsStore = defineStore("user", {
  state: () => ({
    name: "",
    type: "",
  }),
  actions: {
    setUser(user) {
      this.name = user.name;
      this.type = user.type;
    },
  },
});
