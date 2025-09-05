import Vue from "vue";
import VueRouter from "vue-router";
import frontendmenu from "./frontend";
import backendmenu from "./backend";

Vue.use(VueRouter);

const routes = [
  ...frontendmenu,
  ...backendmenu,
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../frontend/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
