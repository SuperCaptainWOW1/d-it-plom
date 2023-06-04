import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: useLocalStorage("user/login", ""),
    type: useLocalStorage("user/type", ""), // "creator" | "user"
    votedProducts: useLocalStorage("user/votedProducts", []),
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
    addVotedProduct(product, companyId) {
      this.votedProducts.push({
        companyId,
        categoryId: product.categoryId,
        itemId: product.itemId,
      });
    },
    removeVotedProduct(product, companyId) {
      this.votedProducts = this.votedProducts.filter(
        (votedProduct) =>
          votedProduct.companyId !== companyId &&
          votedProduct.categoryId !== product.categoryId &&
          votedProduct.itemId !== product.itemId
      );
    },
  },
});
