<template>
	<div class="x-component x-button" :id="meta.id" data-component="x-button">
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-button
			:type="type"
			:ghost="ghost"
			:size="size"
			:shape="shape"
			:danger="danger"
			@click="onClick"
			>{{ name }}
		</a-button>
	</div>
</template>
<script>
import { defineComponent } from "vue";
import eventbus from "../../eventbus";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XButton",
	setup() {
		return {};
	},
	watch: {
		"meta.properties.defaultValue"() {
			this.value = this.meta.properties?.defaultValue || "";
		},
	},
	mounted() {
		this.value = this.meta.properties?.defaultValue || "";
	},
	computed: {
		name() {
			return this.meta.properties?.name || "按钮";
		},
		type() {
			return this.meta.properties?.type || "default";
		},
		ghost() {
			return this.meta.properties?.ghost || false;
		},
		size() {
			return this.meta.properties?.size || "middle";
		},
		shape() {
			return this.meta.properties?.shape || "default";
		},
		danger() {
			return this.meta.properties?.danger || false;
		},
	},
	methods: {
		onClick(e) {
			eventbus.emit(this.meta.id, "click", e);
		},
	},
});
</script>
<style>
.x-component .x-button {
	justify-content: center;
	vertical-align: middle;
	display: flex;
	flex-direction: column;
	margin: 0 5px;
}
</style>