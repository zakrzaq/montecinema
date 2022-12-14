import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import i18n from "@/i18n";
import Notifications from "@kyvg/vue3-notification";

import App from "./App.vue";
import router from "@/router";

import "./assets/styles/main.scss";
import "normalize.css/normalize.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(Notifications);
app.use(i18n);

app.mount("#app");
