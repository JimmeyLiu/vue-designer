<template>
	<a-tabs
		v-model:activeKey="activeKey"
		:animated="false"
		id="setter-panel"
		@change="onTabChange"
	>
		<a-tab-pane key="custom" tab="自定义函数" force-render>
			<div style="margin-bottom: 10px; margin-left: 10px">
				<a-button type="primary" @click="createFunction">
					<plus-outlined />
					新建函数
				</a-button>
			</div>
			<function-table :onRowClick="onClickCustom" />
		</a-tab-pane>
		<a-tab-pane key="builtin" tab="内置函数">
			<function-table :onRowClick="onClickBuiltin" />
		</a-tab-pane>
	</a-tabs>
	<function-editor ref="editor" />
</template>
<script>
import { defineComponent, ref } from "vue";
import FunctionTable from "./FunctionTable.vue";
import FunctionEditor from "./FunctionEditor.vue";

export default defineComponent({
	props: ["components", "datasources"],
	components: { FunctionTable, FunctionEditor },
	setup() {
		return {
			current: ref(undefined),
			activeKey: ref("custom"),
			functions: ref([
				{
					id: "fds",
					component: "表单容器",
					name: "getValue",
					ref: 3,
					children: [{ id: "fds", name: "reset", ref: 3 }],
				},
				{
					id: "ccc",
					component: "表单容器",
					name: "getValue",
					ref: 3,
				},
			]),
		};
	},
	computed: {
		meta() {
			return this.current && this.$xmetas[this.current.component];
		},
	},
	methods: {
		createFunction() {
			this.$refs.editor.create();
		},
		onClickBuiltin(record) {
			this.$refs.editor.view(record);
		},
		onClickCustom(record) {
			this.$refs.editor.edit(record);
		},
		onTabChange() {
			this.$refs.editor.hide();
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