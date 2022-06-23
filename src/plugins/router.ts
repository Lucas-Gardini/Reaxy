import { createRouter, createWebHashHistory } from "vue-router";
import IndexPage from "../pages/index.vue";
import SettingsPage from "../pages/Settings.vue";

const routes = [
	{ path: "/", component: IndexPage },
	{ path: "/settings", component: SettingsPage },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export { router };
