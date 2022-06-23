<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import Panel from "primevue/panel";
import { onMounted, ref } from "vue";
import { Keys, themes } from "../utils/themes";

const emit = defineEmits(["setTheme"]);

const selectedTheme = ref(undefined as any);
const themesMenu = ref([] as any[]);
const selecting = ref(false);

onMounted(() => {
	themesMenu.value = Object.keys(themes).map((theme) => {
		return {
			label: theme,
			icon: theme.includes("dark") || theme.includes("luna") || theme.includes("arya") || theme.includes("vela") ? "pi pi-moon" : "pi pi-sun",
			command: () => {
				emit("setTheme", theme);
			},
		};
	});
});
</script>
<template>
	<div style="margin-top: 100px; margin-left: 15px; margin-right: 15px">
		<h1>Configurações</h1>
		<Panel header="Tema">
			<Button @click="selecting = true">Selecionar Tema</Button>

			<Dialog v-model:visible="selecting" :modal="false" header="Temas" style="margin-left: 5px; margin-right: 5px">
				<h2>Temas Claros</h2>

				<div class="confirmation-content">
					<div v-for="(theme, i) in themesMenu">
						<Button
							v-if="
								!theme.label.includes('dark') &&
								!theme.label.includes('luna') &&
								!theme.label.includes('arya') &&
								!theme.label.includes('vela')
							"
							:label="theme.label"
							class="p-button-raised p-button-secondary"
							:icon="theme.icon"
							style="width: 250px; margin-left: 5px; margin-right: 5px"
							@click="theme.command()"
						/>
					</div>
				</div>

				<h2>Temas Escuros</h2>

				<div class="confirmation-content">
					<div v-for="(theme, i) in themesMenu">
						<Button
							v-if="
								theme.label.includes('dark') ||
								theme.label.includes('luna') ||
								theme.label.includes('arya') ||
								theme.label.includes('vela')
							"
							:label="theme.label"
							class="p-button-raised p-button-primary"
							:icon="theme.icon"
							style="width: 250px; margin-left: 5px; margin-right: 5px"
							@click="theme.command()"
						/>
					</div>
				</div>
				<div style="margin: auto"></div>
			</Dialog>
		</Panel>
	</div>
</template>

<style>
.confirmation-content {
	display: flex;
	flex-flow: row wrap;

	align-items: center;
	justify-content: center;
}
</style>
