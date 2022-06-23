<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "./components/Header.vue";
import { Keys, themes } from "./utils/themes";

const currentTheme = ref(undefined as any);
const projectUrl = ref(null as any);

const checkTheme = (theme?: string | null) => {
	theme = theme ? theme : localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : undefined;

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

	localStorage.setItem("theme", theme ? theme : "lara-light-teal");

	currentTheme.value = cssLink;
};

const setProjectUrl = (url: string) => {
	console.log(url);
	projectUrl.value = url;
};

onMounted(() => {
	checkTheme();
});
</script>

<template>
	<Header @setProjectUrl="setProjectUrl" />
	<router-view v-slot="{ Component }">
		<transition name="slide-fade">
			<component :is="Component" @setTheme="checkTheme" :projectUrl="projectUrl" />
		</transition>
	</router-view>
</template>

<style>
@font-face {
	font-family: Fredoka One;
	src: url(./assets/FredokaOne-Regular.ttf);
}

body {
	margin: 0;
	padding: 0;
	background-color: var(--surface-b);
	color: var(--text-color);
}

a {
	color: var(--text-color);
}

/* width */
::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin-top: 60px;
}

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
	transform: translateX(20px);
	opacity: 0;
}

.slide-fade-leave-to {
	display: none;
}

.no-select {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
