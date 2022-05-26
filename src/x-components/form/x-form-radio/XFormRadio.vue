<template>
	<div
		class="x-component x-form-radio"
		:id="meta.id"
		data-component="x-form-radio"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-radio-group
				v-model:value="value"
				:options="options"
				:disabled="disabled"
				:optionType="optionType"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormRadio",
	mounted() {
		this.setValue();
	},
	computed: {
		label() {
			return this.meta.properties?.label || "单选框";
		},
		colon() {
			return this.meta.properties?.colon;
		},
		options() {
			return this.meta.properties?.options || [];
		},
		disabled() {
			return this.meta.properties?.status === "disabled";
		},
		optionType() {
			return this.meta.properties?.type || "default";
		},
	},
	setup() {
		return {
			value: ref(""),
		};
	},
	watch: {
		"meta.properties.options": {
			deep: true,
			handler() {
				this.setValue();
			},
		},
	},
	methods: {
		setValue() {
			let options = this.meta.properties?.options || [];
			let v = "";
			options.forEach((it) => {
				if (it.checked) {
					v = it.value;
				}
			});
			this.value = v;
		},
	},
});
</script>