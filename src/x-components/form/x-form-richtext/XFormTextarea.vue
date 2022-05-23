<template>
	<div
		class="x-component x-form-richtext"
		:id="meta.id"
		data-component="x-form-richtext"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-textarea v-model:value="value" @change="onChange"></a-textarea>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import formMixin from "../mixin";
export default defineComponent({
	mixins: [formMixin],
	name: "XFormTextarea",
	setup() {
		return {
			value: ref(""),
		};
	},
	computed: {
		label() {
			return (
				(this.data && this.data[this.meta.id]) ||
				this.meta.value ||
				"富文本"
			);
		},
	},
});
</script>