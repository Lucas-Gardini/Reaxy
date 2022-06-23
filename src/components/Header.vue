<script setup lang="ts">
import { onMounted, ref } from "vue";
import { themes, Keys } from "../utils/themes";
import Menubar from "primevue/menubar";
import SplitButton from "primevue/splitbutton";

const currentTheme = ref(undefined as any);

const themesMenu = ref([] as any[]);

const checkTheme = (theme?: string) => {
	if (theme && currentTheme.value !== undefined) {
		currentTheme.value.parentNode.removeChild(currentTheme.value);
	}

	const cssLink = document.createElement("link");
	cssLink.rel = "stylesheet";
	cssLink.href = theme
		? themes[theme as Keys]
		: localStorage.getItem("theme")
		? themes[localStorage.getItem("theme") as Keys]
		: themes["lara-light-teal"];
	document.head.appendChild(cssLink);

	currentTheme.value = cssLink;
};

onMounted(() => {
	checkTheme();

	themesMenu.value = Object.keys(themes).map((theme) => {
		return {
			label: theme,
			icon: theme.includes("dark") ? "pi pi-moon" : "pi pi-sun",
			command: () => {
				checkTheme(theme);
			},
		};
	});
});

const items = ref([
	{
		label: "Options",
		items: [
			{ label: "New", icon: "pi pi-fw pi-plus", command: () => {} },
			{ label: "Delete", icon: "pi pi-fw pi-trash", url: "http://primetek.com.tr" },
		],
	},
	{
		label: "Account",
		items: [
			{ label: "Options", icon: "pi pi-fw pi-cog", to: "/options" },
			{ label: "Sign Out", icon: "pi pi-fw pi-power-off", to: "/logout" },
		],
	},
]);
</script>

<template>
	<div class="browser-top">
		<Menubar :model="items" style="border-radius: 0px; border: 0px">
			<template #start> Before </template>
			<template #item="{ item }">
				<a :href="item.url">{{ item.label }}</a>
			</template>
			<template #end>
				<SplitButton icon="pi pi-plus" :model="themesMenu" />
			</template>
		</Menubar>
	</div>
</template>

<style>
.browser-top {
	position: fixed;
	top: 0;
	width: 100vw;
}
</style>
