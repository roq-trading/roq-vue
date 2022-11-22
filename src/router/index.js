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
      path: "/status/:gateway",
      name: "status",
      component: () => import("../views/StatusView.vue"),
      props: true,
    },
    {
      path: "/public/:gateway",
      name: "public",
      component: () => import("../views/PublicView.vue"),
      props: true,
    },
    {
      path: "/private/:gateway",
      name: "private",
      component: () => import("../views/PrivateView.vue"),
      props: true,
    },
    {
      path: "/strategy/:gateway",
      name: "strategy",
      component: () => import("../views/StrategyView.vue"),
      props: true,
    },
  ],
});

export default router;
