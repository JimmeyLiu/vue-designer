<template>
	<iframe
		v-show="loaded"
		id="simulator"
		ref="simulator"
		src="/simulator.html"
		:onload="onIframeLoad"
		style="
			transform: scale(1);
			height: calc(100vh - 140px);
			width: 100%;
			border: none;
		"
	/>
	<div v-if="!loaded" class="loading">
		<a-spin />
	</div>
</template>
<script >
import { defineComponent, ref } from "vue";
import "jquery-ui/ui/widgets/droppable";
// import $ from "jquery";
// import PageRender from "./render/PageRender.vue";
window.dragging = false;
export default defineComponent({
	setup() {
		return {
			loaded: ref(false),
			components: ref(undefined),
		};
	},
	mounted() {},
	methods: {
		render(components) {
			this.components = components;
			if (this.loaded) {
				this.renderIframeComponents();
			}
		},
		onIframeLoad() {
			this.loaded = true;
			if (this.components) {
				this.renderIframeComponents();
			}
		},
		renderIframeComponents() {
			document
				.getElementById("simulator")
				.contentWindow.render(this.components);
		},
	},
	components: {},
});
</script>

<style scoped>
.loading {
	width: 100%;
	height: 160px;
	line-height: 160px;
	text-align: center;
}
</style>
