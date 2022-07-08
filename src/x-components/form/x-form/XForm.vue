<template>
	<a-form
		:label-col="labelCol"
		:wrapper-col="wrapperCol"
		:labelAlign="labelAlign"
		class="x-component x-form"
		data-component="x-form"
		:id="meta.id"
		:colon="colon"
		:layout="layout"
		:noStyle="true"
	>
		<x-component-slot
			:meta="meta"
			:data="data"
			:mode="mode"
			:pid="meta.id"
		/>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	// mixins: [mixin],
	components: {},
	props: ["meta", "data", "mode"],
	name: "XForm",
	mounted() {
		
	},
	methods: {
		getValue() {},
		reset(){

		}
	},
	computed: {
		layout() {
			return this.meta.properties?.layout || "horizontal";
		},
		labelAlign() {
			return this.meta.properties?.labelAlign || "right";
		},
		labelCol() {
			if (this.meta.properties?.layout !== "horizontal") {
				return {};
			}
			return {
				span: this.meta.properties?.labelSpan || 6,
			};
		},
		wrapperCol() {
			if (this.meta.properties?.layout !== "horizontal") {
				return {};
			}
			return {
				span: this.meta.properties?.wrapperSpan || 18,
			};
		},
		colon() {
			return this.meta.properties?.colon || true;
		},
	},
	setup() {
		return {
			values: ref({}),
			formItemLayout: {},
		};
	},
});
</script>
<style>
.ant-form-inline .x-component-slot {
	display: flex;
	flex-flow: wrap;
}
</style>