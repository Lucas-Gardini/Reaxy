<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "./components/Header.vue";
</script>

<template>
	<Header />
	<router-view v-slot="{ Component }">
		<transition name="slide-fade">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<style>
body {
	margin: 0;
	padding: 0;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}
</style>
