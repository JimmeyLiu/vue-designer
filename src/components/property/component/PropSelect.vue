<template>
	<a-form-item :label="propMeta.title" v-if="dependOn">
		<a-select
			v-model:value="value"
			:placeholder="propMeta.description"
			@change="onValueChange"
			:options="propMeta.properties.options"
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

