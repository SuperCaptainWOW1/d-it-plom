import { defineStore } from "pinia";
import { apiAddress } from "../const";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    companies: [],
    selectedCompany: null,
  }),
  actions: {
    async getCompanies() {
      this.companies = await (await fetch(`${apiAddress}/companies`)).json();
    },
    selectCompany(id) {
      this.selectedCompany = this.companies.find((c) => c.id === id) || null;
    },
    async editCompany(company, votesNumber) {
      await fetch(`${apiAddress}/companies/${company.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: company.name,
          address: company.address,
          lng: company.lng,
          lat: company.lat,
          votesNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.getCompanies();
    },
  },
});
