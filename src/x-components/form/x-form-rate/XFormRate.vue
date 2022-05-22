<template>
	<div
		class="x-component x-form-rate"
		:id="meta.id"
		data-component="x-form-rate"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-rate
				v-model:value="value"
				@change="onChange"
				:allowHalf="true"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import formMixin from "../mixin";
export default defineComponent({
	mixins: [formMixin],
	name: "XFormRate",
	setup() {
		return {
			value: ref(""),
		};
	},
});
</script>