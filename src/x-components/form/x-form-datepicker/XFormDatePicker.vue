<template>
	<div
		class="x-component x-form-datepicker"
		:id="meta.id"
		data-component="x-form-datepicker"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-date-picker
				v-model:value="value"
				:allowClear="allowClear"
				:disabled="disabled"
				:bordered="bordered"
				:style="style"
				:format="format"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import mixin from "../../mixin";
export default defineComponent({
	props: ["meta", "data", "mode"],
	mixins: [mixin],
	name: "XFormDatePicker",
	setup() {
		return {
			value: ref(""),
		};
	},
	computed: {
		label() {
			return this.meta.properties?.label || "日期选择";
		},
		colon() {
			return this.getBooleanValue(this.meta.properties?.colon, true);
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
		format() {
			return this.meta.properties?.format || "YYYY-MM-DD";
		},
		style() {
			let style = {};
			let width = this.meta.properties?.width;
			if (width && width > 0) {
				style.width = width + "px";
			}
			return style;
		},
	},
});
</script>