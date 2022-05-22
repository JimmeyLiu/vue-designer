<template>
	<a-form
		:model="values"
		:label-col="labelCol"
		:wrapper-col="wrapperCol"
		:labelAlign="labelAlign"
		class="x-component x-form"
		data-component="x-form"
		:id="meta.id"
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
	mounted() {},
	computed: {
		labelAlign() {
			return this.meta.properties?.labelAlign || "right";
		},
		labelCol() {
			return {
				span: this.meta.properties?.labelSpan || 6,
			};
		},
		wrapperCol() {
			return {
				span: this.meta.properties?.wrapperSpan || 18,
			};
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
<style scoped>
</style>