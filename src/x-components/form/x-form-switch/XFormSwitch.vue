<template>
	<div
		class="x-component x-form-switch"
		:id="meta.id"
		data-component="x-form-switch"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-switch
				v-model:checked="value"
				@change="onChange"
				:checkedChildren="checkedChildren"
				:unCheckedChildren="unCheckedChildren"
				:disabled="disabled"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormSwitch",
	mounted() {
		this.value = this.meta.properties?.defaultValue || false;
	},
	watch: {
		"meta.properties.defaultValue"() {
			this.value = this.meta.properties?.defaultValue || false;
		},
	},
	computed: {
		label() {
			return this.meta.properties?.label || "开关";
		},
		colon() {
			return this.meta.properties?.colon;
		},
		checkedChildren() {
			return this.meta.properties?.checkedChildren;
		},
		unCheckedChildren() {
			return this.meta.properties?.unCheckedChildren;
		},
		disabled() {
			return this.meta.properties?.status === "disabled";
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