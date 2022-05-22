<template>
	<a-tabs v-model:activeKey="activeKey" :animated="false">
		<a-tab-pane key="1" tab="属性">
			<property-panel ref="propertyPanel" />
		</a-tab-pane>
		<a-tab-pane key="2" tab="样式" force-render
			>Content of Tab Pane 2</a-tab-pane
		>
		<a-tab-pane key="3" tab="事件">
			<event-panel />
		</a-tab-pane>
		<a-tab-pane key="4" tab="高级">Content of Tab Pane 3</a-tab-pane>
	</a-tabs>
</template>
<script>
import { defineComponent, ref } from "vue";
import PropertyPanel from "../property/PropertyPanel.vue";
import EventPanel from "../property/EventPanel.vue";
export default defineComponent({
	components: { PropertyPanel, EventPanel },
	setup() {
		return {
			activeKey: ref("1"),
		};
	},
	methods: {
		onClickComponent(data) {
			this.$refs.propertyPanel.onClickComponent(data);
		},
	},
});
</script>
<style>
</style>