import { defineStore } from "pinia";
import { apiAddress } from "../const";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    companies: [],
    companiesVotes: [],
    categories: [],
    selectedCompany: null,
  }),
  getters: {
    getCompanyVotes(id) {
      return this.companiesVotes.find(c.companyId === id).votesNumbers;
    },
    getCategoryItem(categoryId, itemId) {
      return this.categories
        .find(c.id === categoryId)
        .items.find((i) => i.id === itemId);
    },
  },
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
    async getCompaniesVotes() {
      this.companiesVotes = await (await fetch(`${apiAddress}/votes`)).json();
    },
    async getCategories() {
      this.categories = await (await fetch(`${apiAddress}/categories`)).json();
    },
  },
});
