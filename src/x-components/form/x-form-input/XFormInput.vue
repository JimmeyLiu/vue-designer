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
import formMixin from "../mixin";
export default defineComponent({
	mixins: [formMixin],
	name: "XFormInput",
	setup() {
		return {
			value: ref(""),
		};
	},
	computed: {
		label() {
			return this.meta.properties?.label || "标题";
		},
	},
});
</script>