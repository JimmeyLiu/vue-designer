<template>
	<div class="skeleton-sider">
		<div class="skeleton-sider-menu">
			<div
				class="left-icon-item"
				v-for="panel in panels"
				:key="panel.id"
				:id="panel.id"
				@click="openPane(panel)"
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
				<div class="sider-panel-action" style="">
					<a @click="siderOpen = false">
						<close-outlined />
					</a>
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
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";

import ComponentPanel from "./panel/ComponentPanel.vue";
import StructurePanel from "./panel/StructurePanel.vue";
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
];
export default defineComponent({
	components: { ComponentPanel, StructurePanel },
	props: ["components"],
	emits: ["siderOpenClose"],
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
		openPane(panel) {
			this.title = panel.name;
			this.siderPanel = panel.id;
			this.siderOpen = true;
			$(".active").removeClass("active");
			$("#" + panel.id).addClass("active");
		},
		onClickComponent(data) {
			if (this.$refs.structurePanel) {
				this.$refs.structurePanel.onClickComponent(data);
			}
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