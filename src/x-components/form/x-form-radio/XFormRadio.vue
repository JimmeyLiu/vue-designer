<template>
	<div
		class="x-component x-form-radio"
		:id="meta.id"
		data-component="x-form-radio"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-radio-group v-model:value="value" :options="options" />
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormRadio",
	mounted() {
		this.value = this.meta.defaultValue || "";
	},
	computed: {
		label() {
			return (
				(this.data && this.data[this.meta.id]) ||
				this.meta.properties?.label ||
				"单选框"
			);
		},
		colon() {
			let v = this.meta.properties?.colon;
			return v === undefined ? true : v;
		},
		options() {
			return (
				this.meta.properties?.options || [
					{ label: "选项1", value: "value1" },
					{ label: "选项2", value: "value2" },
				]
			);
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