import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import BaseChip from "./components/UI/BaseChip.vue"

const app = createApp(App);

app.use(router);
app.component('base-chip', BaseChip)

app.mount("#app");
