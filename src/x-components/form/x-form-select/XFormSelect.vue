<template>
	<div
		class="x-component x-form-select"
		data-component="x-form-select"
		:id="meta.id"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-select
				v-model:value="value"
				:placeholder="meta.description"
				:options="options"
				:disabled="disabled"
				:style="style"
				:allowClear="allowClear"
				:bordered="bordered"
				:showArrow="showArrow"
				:showSearch="showSearch"
				:filterOption="localFilter"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormSelect",
	mounted() {
		this.setValue();
	},
	computed: {
		label() {
			return this.meta.properties?.label || "下拉选择";
		},
		colon() {
			return this.meta.properties?.colon || false;
		},
		disabled() {
			return this.meta.properties?.status === "disabled";
		},
		allowClear() {
			return this.meta.properties?.allowClear || false;
		},
		bordered() {
			return this.meta.properties?.bordered || true;
		},
		showArrow() {
			return this.meta.properties?.showArrow || true;
		},
		showSearch() {
			return this.meta.properties?.showSearch || false;
		},
		style() {
			let style = {};
			let width = this.meta.properties?.width;
			if (width && width > 0) {
				style.width = width + "px";
			}
			return style;
		},
		localFilter() {
			return this.meta.properties?.showSearch ? this.filterOption : false;
		},
	},

	setup() {
		return {
			value: ref(""),
			options: ref([]),
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
		filterOption(input, option) {
			return (
				option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
				option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
			);
		},
	},
});
</script>