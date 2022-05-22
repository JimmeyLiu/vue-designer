<template>
	<a-form-item :label="propMeta.title" v-if="dependOn">
		<a-input
			v-model:value="value"
			:placeholder="propMeta.description"
			@change="onValueChange"
		/>
	</a-form-item>
</template>
<script>
import { defineComponent, ref } from "vue";
import { propertyMixin } from "./property";
export default defineComponent({
	mixins: [propertyMixin],
	mounted() {},
	setup() {
		return {
			value: ref(""),
		};
	},
});
</script>