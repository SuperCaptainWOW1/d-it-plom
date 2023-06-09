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
    getCompanyVotedProducts() {
      return this.companiesVotes.find(
        (c) => c.companyId === this.selectedCompany.id
      ).products;
    },
    getCategoryItem: (state) => {
      return (categoryId, itemId) => {
        return state.categories
          .find((c) => c.id === categoryId)
          .items.find((i) => i.id === itemId);
      };
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
    async editVotesNumber(vote, product, number) {
      vote.products.forEach((p) => {
        if (
          p.itemId === product.itemId &&
          p.categoryId === product.categoryId
        ) {
          p.votesNumber += number;
        }
      });

      await fetch(`${apiAddress}/votes/${vote.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: vote.id,
          companyId: vote.companyId,
          products: vote.products,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    async addVoteProduct(vote, categoryId, itemId) {
      console.log(vote, categoryId, itemId);
      await fetch(`${apiAddress}/votes/${vote.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: vote.id,
          companyId: vote.companyId,
          products: [
            ...vote.products,
            {
              categoryId,
              itemId,
              votesNumber: 1,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    async removeVoteProduct(vote, categoryId, itemId) {
      const removingIndex = vote.products.findIndex(
        (p) => p.categoryId === categoryId && p.itemId === itemId
      );
      vote.products.splice(removingIndex, 1);

      await fetch(`${apiAddress}/votes/${vote.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: vote.id,
          companyId: vote.companyId,
          products: vote.products,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  },
});
