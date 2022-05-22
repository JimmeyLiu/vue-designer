<template>
	<a-form-item :label="meta.title" class="x-component" :xid="data.id">
		<x-input :meta="meta" :data="data" :mode="mode" />
	</a-form-item>
</template>
<script>
import { defineComponent, ref } from "vue";
import { xmixin } from "./mixin";
import XInput from "./x-form-input/XFormInput.vue";

export default defineComponent({
	mixins: [xmixin],
	components: { XInput },
	name: "XFormItem",
	mounted() {},
	setup() {
		return {
			value: ref(""),
		};
	},
});
</script>