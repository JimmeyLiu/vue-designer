<template>
	<a-form-item :label="propMeta.title" v-if="dependOn">
		<a-switch
			v-model:checked="value"
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
	setup() {
		return {
			value: ref(""),
		};
	},
});
</script>
