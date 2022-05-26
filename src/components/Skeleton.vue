<template>
	<div class="skeleton-layout">
		<skeleton-header
			:components="components"
			:datasources="datasources"
			@save="onSave"
		/>
		<div class="skeleton-body">
			<skeleton-sider
				@siderOpenClose="onSiderOpenClose"
				:components="components"
				:datasources="datasources"
				@sort="onStructureSort"
				@updateDatasources="onUpdateDatasources"
				ref="skeletonSider"
			/>
			<div :class="mainClass">
				<div class="skeleton-toolbar">
					<skeleton-toolbar />
				</div>
				<div class="skeleton-main-simulator">
					<div class="skeleton-simulator-container">
						<skeleton-simulator ref="simulator" />
					</div>
				</div>
			</div>
			<div class="skeleton-property">
				<properties-panel
					ref="propertiesPanel"
					:components="components"
					:datasources="datasources"
					@change="onPropertiesChange"
				/>
			</div>
		</div>
	</div>

	<!-- <source-panel ref="sourcePane" />
	<blockly-panel ref="javascriptPane" /> -->
</template>
<script>
import { defineComponent, ref } from "vue";
// import $ from "jquery";
import PropertiesPanel from "./panel/PropertiesPanel.vue";
// import SourcePanel from "./panel/SourcePanel.vue";
// import BlocklyPanel from "./panel/BlocklyPanel.vue";
// import DemoForm from "./DemoForm.vue";
import SkeletonHeader from "./SkeletonHeader.vue";
import SkeletonSider from "./SkeletonSider.vue";
import SkeletonToolbar from "./SkeletonToolbar.vue";
import SkeletonSimulator from "./SkeletonSimulator.vue";

export default defineComponent({
	components: {
		PropertiesPanel,
		SkeletonHeader,
		SkeletonSider,
		SkeletonToolbar,
		SkeletonSimulator,
	},

	setup() {
		return {
			siderOpen: ref(false),
			components: ref([]),
			datasources: ref([]),
			componentMap: ref({}),
		};
	},
	computed: {
		mainClass() {
			return [
				"skeleton-main",
				this.siderOpen ? "skeleton-sider-open" : "skeleton-sider-close",
			];
		},
	},
	mounted() {
		this.bindComponentsChange();
		this.initComponents();
	},
	watch: {
		components: {
			deep: true,
			handler() {
				let map = {};
				this.components.forEach((it) => {
					map[it.id] = it;
					this.collectChildren(map, it);
				});
				this.componentMap = map;
			},
		},
	},
	methods: {
		bindComponentsChange() {
			let _this = this;
			window.onmessage = function (e) {
				if (e.data.type === "componentsChange") {
					console.log(e.data);
					_this.components = JSON.parse(e.data.components);
					return;
				}
				if (e.data.type === "clickComponent") {
					let meta = _this.componentMap[e.data.id];
					_this.$refs.propertiesPanel.onClickComponent(meta);
					_this.$refs.skeletonSider.onClickComponent(meta);
				}
				if (e.data.type === "unChoosed") {
					_this.$refs.propertiesPanel.onClickComponent({});
					_this.$refs.skeletonSider.onClickComponent({});
				}
			};
		},
		onSiderOpenClose(open) {
			this.siderOpen = open;
		},
		//保存schema的处理，改成对应的接口
		onSave() {
			this.saveToLocalStorage();
			this.$message.success("保存成功");
		},
		saveToLocalStorage() {
			let data = {
				components: this.components,
				datasources: this.datasources,
			};

			let json = JSON.stringify(data);
			localStorage.setItem("component", json);
		},
		initComponents() {
			let json = localStorage.getItem("component");
			if (json) {
				let d = JSON.parse(json);
				this.components = d.components;
				this.datasources = d.datasources;
			}
			console.log("datasources", this.datasources);

			this.$refs.simulator.render(this.components);
		},
		onPropertiesChange(meta) {
			this.componentMap[meta.id].properties = meta.properties;
			this.$refs.simulator.render(this.components);
		},
		onStructureSort(components) {
			this.components = components;
			let iframe = document.getElementById("simulator");
			iframe.contentWindow.render(components);
		},
		collectChildren(map, component) {
			if (!component.children) {
				return;
			}
			component.children.forEach((it) => {
				map[it.id] = it;
				this.collectChildren(map, it);
			});
		},
		onUpdateDatasources(d) {
			this.datasources = d;
		},
	},
});
</script>
<style>
.skeleton-header {
	height: 48px;
	line-height: 48px;
	background: #fff;
	display: flex;
	border-bottom: 1px solid #eff2f5;
}
.skeleton-body {
	display: flex;
}
.skeleton-sider {
	display: flex;
	height: calc(100vh - 48px);
}
.skeleton-sider-menu {
	text-align: center;
	width: 48px;
	background: #fff;
	border-right: 1px solid #eff2f5;
}
.skeleton-sider-panel {
	background: #fff;
	width: 300px;
	height: calc(100vh - 120px);
}
.skeleton-panel-header {
	display: flex;
	height: 42px;
	line-height: 42px;
	padding: 0 10px;
}

.skeleton-panel-body {
	/* padding: 10px; */
	border-top: 1px solid #eff2f5;
}
.skeleton-toolbar {
	display: flex;
	height: 42px;
	line-height: 42px;
	border-left: 1px solid #eff2f5;
	background: #fff;
	padding: 0 10px;
}
.sider-panel-title {
	display: flex;
	font-size: 16px;
}
.sider-panel-action {
	text-align: right;
	width: 50%;
}
.skeleton-main {
	background: #eff2f5;
}
.skeleton-sider-open {
	width: calc(100vw - 668px);
}

.skeleton-sider-close {
	width: calc(100vw - 368px);
}
.skeleton-property {
	width: 320px;
	border-left: 1px solid #eff2f5;
	position: absolute;
	right: 0;
	height: calc(100vh - 48px);
}

.skeleton-main-simulator {
	padding: 16px;
	width: 100%;
	text-align: center;
}
.skeleton-simulator-container {
	height: calc(100vh - 124px);
	display: flex;
	overflow: scroll;
	margin: 0 auto;
	background: #fff;
}
.ant-drawer-body {
	padding: 10px;
	height: calc(100vh - 120px);
	overflow-y: scroll;
}

.ant-tabs-nav .ant-tabs-tab {
	margin: 0 !important;
	padding: 10px 20px !important;
}
.ant-tabs-nav {
	margin: 0 !important;
}
.ant-tabs-content {
	padding: 10px;
	overflow-y: scroll;
}
</style>