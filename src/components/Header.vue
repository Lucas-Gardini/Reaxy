<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { appWindow } from "@tauri-apps/api/window";
import { onMounted, ref } from "vue";
import { router } from "../plugins/router";

const emit = defineEmits(["back", "forward", "refresh", "setProjectUrl"]);

const printing = ref(false);
const projectUrl = ref("");

const print = () => {
	printing.value = true;
	window.print();
	printing.value = false;
};

const isAtSettings = ref(false);

const goToSettings = () => {
	if (isAtSettings.value) {
		isAtSettings.value = false;
		router.push("/");
	} else {
		isAtSettings.value = true;
		router.push("/settings");
	}
};

const setProjectUrl = () => {
	if (!projectUrl.value.includes("http")) {
		alert("Url inválida");
	} else {
		emit("setProjectUrl", projectUrl.value);
	}
};

onMounted(() => {
	setTimeout(() => {
		isAtSettings.value = router.currentRoute.value.fullPath.includes("settings") ? true : false;
		console.log(router.currentRoute.value.fullPath);
	}, 1000);
});
</script>

<template>
	<div :style="`display: ${printing ? 'none' : 'auto'};`">
		<div data-tauri-drag-region class="titlebar">
			<span class="titlebar-title">Reaxy</span>

			<div style="margin-left: auto">
				<div class="titlebar-button" id="titlebar-minimize" @click="appWindow.minimize()">
					<Icon class="no-select" icon="mdi:minus" />
				</div>
				<div
					class="titlebar-button"
					id="titlebar-maximize"
					@click="
						async () => {
							(await appWindow.isMaximized()) ? appWindow.unmaximize() : appWindow.maximize();
						}
					"
				>
					<Icon class="no-select" icon="mdi:crop-square" />
				</div>
				<div class="titlebar-button close" id="titlebar-close" @click="appWindow.close()">
					<Icon class="no-select" icon="mdi:window-close" />
				</div>
			</div>
		</div>

		<div class="toolbar">
			<div style="display: flex; justify-content: space-around">
				<div class="toolbar-button" @click="emit('back')">
					<Icon class="no-select" icon="mdi:less-than" />
				</div>
				<div class="toolbar-button" @click="emit('forward')">
					<Icon class="no-select" icon="mdi:greater-than" />
				</div>
				<div class="toolbar-button" @click="emit('refresh')">
					<Icon class="no-select" icon="mdi:refresh" />
				</div>
			</div>

			<input class="toolbar-search" v-model="projectUrl" @keypress.enter="setProjectUrl" />

			<div style="display: flex; justify-content: space-around">
				<div class="toolbar-button" @click="print">
					<Icon class="no-select" icon="mdi:camera-outline" />
				</div>
				<div class="toolbar-button" @click="appWindow.minimize()">
					<Icon class="no-select" icon="mdi:dev-to" />
				</div>
				<div class="toolbar-button" @click="goToSettings">
					<Icon class="no-select" :icon="isAtSettings ? 'mdi:home-outline' : 'mdi:cog-outline'" />
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="browser-top">
		<Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text" />
		<Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text" />

		<Menubar :model="items" style="border-radius: 0px; border: 0px">
			<template #start>
				<span style="font-family: 'Fredoka One', cursive">Reaxy</span>
			</template>
			<template #item="{ item }">
				<a :href="item.url">{{ item.label }}</a>
			</template>
			<template #end>
				<SplitButton icon="pi pi-plus" :model="themesMenu" />
			</template>
		</Menubar>
	</div> -->
</template>

<style>
.titlebar {
	height: 30px;
	background: #313233;
	user-select: none;
	display: flex;
	justify-content: flex-end;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 99;
}

.titlebar-title {
	display: inline-block;
	font-family: "Fredoka One", cursive;
	margin-right: auto;
	margin-top: auto;
	margin-bottom: auto;
	margin-left: 5px;
	/* width: 30px; */
	/* height: 30px; */
	color: white;
}

.titlebar-button {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
}

.titlebar-button * {
	color: white;
}

.titlebar-button:hover {
	background: var(--primary-color);
}

.titlebar-button.close:hover {
	background: #ef4444;
}

.toolbar {
	display: grid;
	grid-template-columns: 10% 80% 10%;
	grid-template-rows: 35px;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	height: 35px;
	width: 100vw;
	background: #2b2e37;
	user-select: none;
	position: fixed;
	top: 30px;
	left: 0;
	right: 0;
	z-index: 99;
}

@media (min-width: 900px) {
	.toolbar {
		grid-template-columns: 5% 85% 10%;
	}
}

.toolbar-button {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: auto;
	height: 35px;
	cursor: pointer;
}

.toolbar-button * {
	color: white;
}

.toolbar-search {
	width: 100%;
	outline: none !important;
	border: none;
	border-radius: 15px;
	padding-left: 5px;
	padding-right: 5px;
}
</style>
