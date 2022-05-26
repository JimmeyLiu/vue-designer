<template>
	<div
		class="x-component x-form-input"
		:id="meta.id"
		data-component="x-form-input"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-input
				v-if="type === 'input'"
				v-model:value="value"
				:allowClear="allowClear"
				:disabled="disabled"
				:showCount="showCount"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:readonly="readonly"
				:style="style"
				@change="onChange"
			/>
			<a-textarea
				v-else-if="type === 'textarea'"
				v-model:value="value"
				:allowClear="allowClear"
				:disabled="disabled"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:style="style"
				@change="onChange"
			/>
			<a-input-password
				v-else-if="type === 'password'"
				v-model:value="value"
				:allowClear="allowClear"
				:disabled="disabled"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:style="style"
				@change="onChange"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormInput",
	setup() {
		return {
			value: ref(""),
		};
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
		label() {
			return this.meta.properties?.label || "单行文本";
		},
		colon() {
			return this.meta.properties?.colon || false;
		},
		type() {
			return this.meta.properties?.type || "input";
		},
		allowClear() {
			return this.meta.properties?.allowClear || false;
		},
		readonly() {
			return this.meta.properties?.status === "readonly";
		},
		disabled() {
			return this.meta.properties?.status === "disabled";
		},
		showCount() {
			return this.meta.properties?.showCount || false;
		},
		maxlength() {
			return this.meta.properties?.maxLength || undefined;
		},
		placeholder() {
			return this.meta.properties?.placeholder || undefined;
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