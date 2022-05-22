<template>
	<div
		class="x-component x-form-input"
		:id="meta.id"
		data-component="x-form-input"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-input v-model:value="value" @change="onChange" />
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormInput",
	mounted() {
		this.value = this.meta.defaultValue || "";
	},
	computed: {
		label() {
			return (
				(this.data && this.data[this.meta.id]) ||
				this.meta.properties?.label ||
				"标题"
			);
		},
		colon() {
			let v = this.meta.properties?.colon;
			return v === undefined ? true : v;
		},
		defaultValue() {
			return this.meta.defaultValue || "";
		},
	},
	setup() {
		return {
			value: ref(""),
		};
	},
	methods: {
		onChange() {},
		onCustomChange() {},
	},
});
</script>