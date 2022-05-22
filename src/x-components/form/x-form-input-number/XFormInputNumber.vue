<template>
	<div
		class="x-component x-form-input-number"
		:id="meta.id"
		data-component="x-form-input-number"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-input-number v-model:value="value" @change="onChange" />
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import formMixin from "../mixin";
export default defineComponent({
	mixins: [formMixin],
	name: "XFormInputNumber",
	setup() {
		return {
			value: ref(""),
		};
	},
});
</script>