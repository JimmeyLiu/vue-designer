<template>
	<a-tabs style="height: calc(100vh - 180px)" id="component-pane">
		<a-tab-pane key="1" tab="基础组件">
			<div style="height: cal(100vh - 150px)">
				<template v-for="group in components" :key="group.group">
					<div class="component-group-title">{{ group.group }}</div>
					<draggable
						@start="onDragStart"
						@end="onDragEnd"
						:sort="false"
						style="display: flex; flex-flow: wrap"
					>
						<div
							v-for="d in group.components"
							:key="d.component"
							class="component-item"
							:component="d.component"
						>
							<i class="component-item-icon"
								><font-size-outlined /></i
							>{{ d.title }}
						</div>
					</draggable>
				</template>
			</div>
		</a-tab-pane>
		<a-tab-pane key="2" tab="自定义组件">
			<a-list
				:grid="{
					gutter: 2,
					xs: 2,
					wrap: true,
				}"
				:data-source="data"
			>
				<template #renderItem="{ item }">
					<a-list-item>
						<!-- <a-card :title="item.title">Card content</a-card> -->
						<div
							class="component-item"
							x-component="EntityFormItem"
						>
							{{ item.title }}
						</div>
						<div id="EntityFormItem" style="display: none">
							<a-form-item
								label="Activity zone"
								class="dnd-target"
							>
								<a-select placeholder="please select your zone">
									<a-select-option value="shanghai"
										>Zone one</a-select-option
									>
									<a-select-option value="beijing"
										>Zone two</a-select-option
									>
								</a-select>
							</a-form-item>
						</div>
					</a-list-item>
				</template>
			</a-list>
		</a-tab-pane>
	</a-tabs>
</template>
<script>
import { defineComponent } from "vue";
import xComponents from "@/x-components";
import $ from "jquery";
import { VueDraggableNext } from "vue-draggable-next";

export default defineComponent({
	components: { draggable: VueDraggableNext },
	setup() {
		return {};
	},
	computed: {
		components() {
			return xComponents.components;
		},
	},
	methods: {
		onDragStart(evt) {
			let iframe = document.getElementById("simulator");
			iframe.contentWindow.postMessage(
				{
					type: "addComponent",
					data: {
						component: $(evt.item).attr("component"),
					},
				},
				"*"
			);
		},
		onDragEnd(evt) {
			let iframe = document.getElementById("simulator");
			iframe.contentWindow.postMessage(
				{
					type: "onComponentDrop",
					data: {
						component: $(evt.item).attr("component"),
					},
				},
				"*"
			);
		},
	},
});
</script>
<style>
.component-item {
	height: 36px;
	line-height: 36px;
	justify-content: center;
	width: 130px;
	padding: 0 8px;
	margin: 5px 4px;
	background: #fff;
	border: 1px solid #e5e6e8;
	border-radius: 4px;
	background-color: #fff;
	z-index: 4000 !important;
}
.component-item:hover {
	color: #197afe;
	border-color: #197afe;
	cursor: pointer;
}
.component-item-icon {
	padding-right: 8px;
}
.component-item-drag {
	z-index: 1000 !important;
}
.component-group-title {
	padding: 8px 0;
}
</style>