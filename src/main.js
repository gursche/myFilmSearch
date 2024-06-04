//import './assets/main.css'
// replaced with bootstrap in App.vue

import { createApp } from "vue";
import { createPinia, setActivePinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";

import PortalVue from "portal-vue";
// import router from './router'
// router not needed for this project

const app = createApp(App);

app.config.globalProperties.console = console;

app.use(createPinia().use(piniaPluginPersistedstate));
// set Pinia active from beginning
app.use(setActivePinia);
// set console for console.log
// app.use(router)
app.use(PortalVue);
// to teleport modal

app.mount("#app");
