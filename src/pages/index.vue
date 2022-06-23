<script setup lang="ts">
import { onMounted, ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Card from "primevue/card";

const props = defineProps(["projectUrl"]);

const firstAccess = ref(localStorage.getItem("access") ? false : true);
const step = ref(0);
const screens = ref([] as any[]);

const completeAccess = (screenType: string) => {
	let screens: any[] = [];

	if (screenType === "all") {
		screens = [
			{ title: "Desktop", resolution: { x: 1280, y: 800 } },
			{ title: "Tablet", resolution: { x: 500, y: 768 } },
			{ title: "Mobile", resolution: { x: 320, y: 568 } },
		];
	} else {
		screens = [
			{ title: "Mobile Fold", resolution: { x: 520, y: 668 } },
			{ title: "Tablet", resolution: { x: 500, y: 768 } },
			{ title: "IPad", resolution: { x: 768, y: 1024 } },
		];
	}

	localStorage.setItem("access", "true");
	localStorage.setItem("screens", JSON.stringify(screens));
	firstAccess.value = false;

	getScreens();
};

const getScreens = () => {
	screens.value = JSON.parse(localStorage.getItem("screens") || "[]");
};

onMounted(() => {
	getScreens();
});
</script>

<template>
	<div style="margin-top: 100px; margin-left: 15px; margin-right: 15px">
		<div v-if="!props.projectUrl">
			<h1>Comece adicionando a url do seu projeto acima!</h1>
			<h2>Ou, se preferir, acesse as configurações acessando a 'engrenagem'</h2>
		</div>

		<div v-else class="screens">
			<iframe
				class="screen"
				v-for="(screen, i) in screens"
				:src="projectUrl"
				:width="screen.resolution.x"
				:height="screen.resolution.y"
				:key="i"
			></iframe>
		</div>

		<Dialog style="margin-left: 30px; margin-right: 30px" header="Obrigado!" v-model:visible="firstAccess" :modal="true" :closable="false">
			<div
				v-if="step === 0"
				style="display: grid; grid-template-columns: 40% 60%; grid-template-rows: auto; grid-column-gap: 0px; grid-row-gap: 0px"
			>
				<img src="/thanks.svg" style="width: 100%; height: 50vh" />
				<div style="display: flex; flex-direction: column">
					<h1 style="text-align: center">Obrigado por baixar o Reaxy! Seu aplicativo de testes de responsividade de websites!</h1>

					<br />

					<Button class="p-button-danger" style="margin: auto" label="Continuar" @click="step = 1" />
				</div>
			</div>

			<div v-else-if="step === 1">
				<h1>Antes de continuarmos, escolha um conjunto de telas</h1>
				<div style="display: flex; flex-direction: row">
					<Card style="width: 45%; margin-right: 5%">
						<template #title> Plataformas Genéricas </template>
						<template #content>
							<img src="/all.svg" style="width: 25vw; height: 25vh" />
							<p>Teste de responsividade em telas de diversos tamanhos</p>
						</template>
						<template #footer>
							<Button class="p-button-danger" icon="pi pi-check" label="Escolher" @click="completeAccess('all')" />
						</template>
					</Card>
					<Card style="width: 50%">
						<template #title> Mobile </template>
						<template #content>
							<img src="/mobile.svg" style="width: 25vw; height: 25vh" />
							<p>Teste de responsividade em telas menores (celulares, tablets, etc)</p>
						</template>
						<template #footer>
							<Button class="p-button-danger" icon="pi pi-check" label="Escolher" @click="completeAccess('mobile')" />
						</template>
					</Card>
				</div>
				<h5>Você poderá alterar as telas nas configurações</h5>
			</div>
		</Dialog>
	</div>
</template>

<style>
.screens {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: max-content;
	width: max-content;
	overflow-x: scroll;
	transform-origin: top left;
	margin-right: 30px;

	transform: scale(0.65);
}

.screen {
}
</style>
