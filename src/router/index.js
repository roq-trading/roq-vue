import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/status",
      name: "status",
      component: () => import("../views/StatusView.vue"),
      props: false,
    },
    {
      path: "/status/:gateway",
      name: "status_by_gateway",
      component: () => import("../views/StatusView.vue"),
      props: true,
    },
    {
      path: "/public",
      name: "public",
      component: () => import("../views/PublicView.vue"),
      props: false,
    },
    {
      path: "/public/:gateway",
      name: "public_by_gateway",
      component: () => import("../views/PublicView.vue"),
      props: true,
    },
    {
      path: "/private",
      name: "private",
      component: () => import("../views/PrivateView.vue"),
      props: false,
    },
    {
      path: "/private/:gateway",
      name: "private_by_gateway",
      component: () => import("../views/PrivateView.vue"),
      props: true,
    },
    {
      path: "/strategy",
      name: "strategy",
      component: () => import("../views/StrategyView.vue"),
      props: false,
    },
    {
      path: "/strategy/:gateway",
      name: "strategy_by_gateway",
      component: () => import("../views/StrategyView.vue"),
      props: true,
    },
  ],
});

export default router;
