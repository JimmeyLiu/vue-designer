<template>
	<div
		class="x-component x-form-radio"
		:id="meta.id"
		data-component="x-form-radio"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-checkbox-group
				v-model:value="value"
				:options="options"
				:disabled="disabled"
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
		this.setOptions();
	},
	watch: {
		"meta.properties.options": {
			deep: true,
			handler() {
				this.setValue();
			},
		},
	},
	computed: {
		label() {
			return this.meta.properties?.label || "多选框";
		},
		colon() {
			let v = this.meta.properties?.colon;
			return v === undefined ? true : v;
		},
		disabled() {
			return this.meta.properties?.status === "disabled";
		},
	},
	setup() {
		return {
			value: ref([]),
			options: ref([]),
		};
	},
	methods: {
		onChange() {},
		onCustomChange() {},
		setOptions() {
			// let optionType = this.meta.properties?.optionType;
			// if(optionType === 'remote'){
			// 	let methodType = this.meta.properties?.methodType;

			// }
		},
		setValue() {
			let optionType = this.meta.properties?.optionType;
			if (optionType === "custom") {
				let options = this.meta.properties?.options || [];
				let value = [];
				options.forEach((it) => {
					if (it.checked) {
						value.push(it.value);
					}
				});
				this.options = options;
				this.value = value;
			}
		},
	},
});
</script>