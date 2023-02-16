import { createApp } from "vue";
import { Quasar } from "quasar";
import App from "./App.vue";
import axios from "axios";
import router from "@/router";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import moment from "moment";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import "./style.css";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

/**
 * @params {date} date to be converted to timeago
 * @returns returns timeAgo
 */

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$filters = {
  timeAgo(date: string) {
    return moment(date).fromNow();
  },
  dateToRandom(date: string) {
    // return moment(date).format("dddd, MMMM Do YYYY");
    return moment(date).format("YY-MM-DD");
  },
  dateMoment(date: string) {
    // return moment(date).format("dddd, MMMM Do YYYY");
    return moment(date).format("DD/MM/YYYY");
  },
  reverse(items: string[]) {
    return items.slice().reverse();
  },
};

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app
  .provide("electron", (window as any).electronAPI)
  .use(Quasar, {})
  .use(pinia)
  .component("vue-cal", VueCal)
  .use(router)
  .mount("#app");
