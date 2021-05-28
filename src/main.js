import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
