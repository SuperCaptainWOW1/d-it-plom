import { defineStore } from "pinia";
import { apiAddress } from "../const";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    companies: [],
  }),
  actions: {
    async getCompanies() {
      this.companies = await (await fetch(`${apiAddress}/companies`)).json();
    },
  },
});
