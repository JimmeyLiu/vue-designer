<template>
	<div class="skeleton-sider" id="skeleton-sider">
		<div class="skeleton-sider-menu">
			<div
				class="left-icon-item"
				v-for="panel in panels"
				:key="panel.id"
				:id="panel.id"
				@click="openPanel(panel)"
			>
				<component
					:is="panel.icon"
					:style="{
						fontSize: '20px',
						paddingTop: '20px',
					}"
				/>
			</div>
		</div>
		<div class="skeleton-sider-panel" v-if="siderOpen">
			<div class="skeleton-panel-header">
				<div class="sider-panel-title" style="width: 50%">
					{{ title }}
				</div>
				<div class="sider-panel-action">
					<span style="cursor: pointer" @click="closePanel">
						<close-outlined />
					</span>
				</div>
			</div>
			<div class="skeleton-panel-body">
				<structure-panel
					ref="structurePanel"
					v-if="siderPanel === 'structurePanel'"
					:components="components"
				/>
				<component-panel
					ref="componentPanel"
					v-if="siderPanel === 'componentPanel'"
				/>
				<datasource-panel
					ref="datasourcePanel"
					:datasources="datasources"
					@update="updateDatasources"
					v-if="siderPanel === 'datasourcePanel'"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";

import ComponentPanel from "./panel/ComponentPanel.vue";
import StructurePanel from "./panel/StructurePanel.vue";
import DatasourcePanel from "./panel/DatasourcePanel.vue";
import $ from "jquery";
const panels = [
	{
		id: "componentPanel",
		name: "组件库",
		icon: "appstore-add-outlined",
	},
	{
		id: "structurePanel",
		name: "结构树",
		icon: "pic-right-outlined",
	},
	{
		id: "datasourcePanel",
		name: "数据源",
		icon: "api-outlined",
	},
];
export default defineComponent({
	components: { ComponentPanel, StructurePanel, DatasourcePanel },
	props: ["components", "datasources"],
	emits: ["siderOpenClose", "updateDatasources"],
	setup() {
		return {
			panels,
			title: ref(""),
			siderPanel: ref(""),
			siderOpen: ref(false),
		};
	},
	watch: {
		siderOpen() {
			this.$emit("siderOpenClose", this.siderOpen);
		},
	},
	mounted() {},
	methods: {
		openPanel(panel) {
			this.title = panel.name;
			this.siderPanel = panel.id;
			this.siderOpen = true;
			$(".active").removeClass("active");
			$("#" + panel.id).addClass("active");
		},
		closePanel() {
			this.siderOpen = false;
			$(".active").removeClass("active");
		},
		onClickComponent(data) {
			if (this.$refs.structurePanel) {
				this.$refs.structurePanel.onClickComponent(data);
			}
		},
		updateDatasources(d) {
			this.$emit("updateDatasources", d);
		},
	},
});
</script>
<style scoped>
.left-icon-item {
	cursor: pointer;
}
.active {
	color: #197afe;
	border-color: #197afe;
}
</style>