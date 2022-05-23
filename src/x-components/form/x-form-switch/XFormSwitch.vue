<template>
	<div
		class="x-component x-form-switch"
		:id="meta.id"
		data-component="x-form-switch"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-switch v-model:checked="value" @change="onChange" />
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormSwitch",
	mounted() {
		this.value = this.meta.defaultValue || false;
	},
	computed: {
		label() {
			return this.meta.properties?.label || "开关";
		},
		colon() {
			let v = this.meta.properties?.colon;
			return v === undefined ? true : v;
		},
	},
	setup() {
		return {
			value: ref(false),
		};
	},
	methods: {
		onChange() {},
		onCustomChange() {},
	},
});
</script>