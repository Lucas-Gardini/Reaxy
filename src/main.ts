import "primeicons/primeicons.css";

import { createApp } from "vue";
import { router } from "./plugins/router";
import App from "./App.vue";
import PrimeVue from "primevue/config";

createApp(App).use(router).use(PrimeVue).mount("#app");
