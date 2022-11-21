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
      path: "/market/:gateway",
      name: "market",
      component: () => import("../views/MarketView.vue"),
      props: true,
    },
    {
      path: "/user/:gateway",
      name: "user",
      component: () => import("../views/UserView.vue"),
      props: true,
    },
  ],
});

export default router;
