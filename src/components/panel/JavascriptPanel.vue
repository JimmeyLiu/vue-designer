<template>
	<a-drawer
		id="javascript-pane"
		title="逻辑方法编辑"
		placement="left"
		:width="width"
		:visible="true"
		:mask="false"
		@close="close"
		:headerStyle="{
			height: '40px',
			lineHeight: '40px',
			padding: '10px 10px',
		}"
	>
		<code-editor mode="text/javascript" />
	</a-drawer>
</template>
<script>
import { defineComponent, ref } from "vue";
import $ from "jquery";
import CodeEditor from "../code/CodeEditor.vue";
export default defineComponent({
	components: { CodeEditor },
	setup() {
		const width = document.documentElement.clientWidth - 350;
		return {
			width: ref(width),
		};
	},
	methods: {
		open() {
			$("#javascript-pane").show();
		},
		close() {
			$("#javascript-pane").hide();
		},
	},
});
</script>