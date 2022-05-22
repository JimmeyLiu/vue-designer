<template>
	<a-drawer
		title="抽屉标题"
		:width="width"
		:visible="visible"
		@close="visible = false"
		:bodyStyle="bodyStyle"
	>
		<x-component-slot :data="data" :mode="mode" :pid="data.id" />
		<template #footer>
			<a-space>
				<a-button @click="onClose">Cancel</a-button>
				<a-button type="primary" @click="onClose">Submit</a-button>
			</a-space>
		</template>
	</a-drawer>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	name: "XDrawer",
	props: ["data", "mode"],
	setup() {
		return {
			visible: ref(true),
			form: ref({}),
		};
	},
	mounted() {
		console.log(this.data);
	},
	computed: {
		width() {
			return this.data?.properties?.width || 720;
		},
		bodyStyle() {
			return {
				height: "calc(100vh - 120px)",
			};
		},
	},
});
</script>
