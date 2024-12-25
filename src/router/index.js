import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/Services.vue'),
    },
    {
      name: 'service',
      path: '/:name',
      component: () => import('../views/Service.vue'),
      props: true,
    },
  ],
});

export default router;
