import { createRouter, createWebHistory } from "vue-router";
import Auth from "./views/Auth.vue";
import Companies from "./views/Companies.vue";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
import Votes from "./views/Votes.vue";

import { useUserStore } from "./stores/user";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    name: "Auth",
    path: "/auth",
    component: Auth,
  },
  {
    name: "Companies",
    path: "/companies",
    meta: { requiresAuth: true, requiresCreatorRights: true },
    component: Companies,
  },
  {
    name: "Votes",
    path: "/votes/:id",
    meta: { requiresAuth: true, requiresUserRights: true },
    component: Votes,
  },
  // will match everything and put it under `$route.params.pathMatch`
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.username) return "/auth";
  if (to.meta.requiresCreatorRights && userStore.type !== "creator") return "/";
  if (to.meta.requiresUserRights && userStore.type !== "user") return "/";
});

export default router;
