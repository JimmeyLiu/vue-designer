<template>
	<a-tabs v-model:activeKey="activeKey" :animated="false" id="setter-panel">
		<a-tab-pane key="1" tab="属性">
			<property-panel
				ref="propertyPanel"
				id="propertyPanel"
				:datasources="datasources"
				v-bind="$attrs"
			/>
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
	props: ["components", "datasources"],
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
#setter-panel .ant-tabs-content {
	padding: 10px 0 !important;
}
#setter-panel .ant-tabs-tabpane {
	height: calc(100vh - 110px);
	overflow-y: scroll;
	padding-bottom: 20px;
}
</style>