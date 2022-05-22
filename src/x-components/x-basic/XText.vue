<template>
	<div class="x-component x-text" :id="meta.id" data-component="x-text">
		{{ text }}
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XText",
	setup() {
		return {
			text: ref(""),
		};
	},
	mounted() {
		this.text = this.meta.defaultValue || "请输入文本内容";
	},
});
</script>
