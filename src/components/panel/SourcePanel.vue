<template>
	<a-drawer
		id="source-pane"
		title="代码预览"
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
		<code-view />
	</a-drawer>
</template>
<script>
import { defineComponent, ref } from "vue";
import $ from "jquery";
import CodeView from "../code/CodeView.vue";
export default defineComponent({
	components: { CodeView },
	setup() {
		const width = document.documentElement.clientWidth - 350;
		return {
			width: ref(width),
		};
	},
	methods: {
		open() {
			$("#source-pane").show();
		},
		close() {
			$("#source-pane").hide();
		},
	},
});
</script>