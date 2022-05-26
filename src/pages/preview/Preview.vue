<template>
	<div id="container">
		<component
			v-for="cmp in components"
			:key="cmp.id"
			:is="cmp.component"
			:meta="cmp"
			mode="preview"
		/>
		<!-- <x-form :data="data" /> -->
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: "App",
	setup() {
		return {
			components: ref([]),
		};
	},
	mounted() {
		window.render = this.render;
	},
	methods: {
		render(components) {
			this.components = components;
		},
	},
});
</script>
<style>
#container {
	position: relative;
	padding: 20px 100px;
}
</style>
