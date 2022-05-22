<template>
	<div
		class="x-component x-form-datepicker"
		:id="meta.id"
		data-component="x-form-datepicker"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-date-picker v-model:value="value" />
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import formMixin from "../mixin";
export default defineComponent({
	mixins: [formMixin],
	name: "XFormDatePicker",
	setup() {
		return {
			value: ref(""),
		};
	},
});
</script>