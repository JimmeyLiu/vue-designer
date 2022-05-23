<template>
	<div id="shadow">
		<div class="x-component"></div>
	</div>
	<div id="container">
		<component
			v-for="cmp in components"
			:key="cmp.id"
			:is="cmp.component"
			:meta="cmp"
			:mode="mode"
		/>
		<!-- <x-form :data="data" /> -->
	</div>
	<div
		class="component-toolbar-container"
		v-if="mode === 'design'"
		id="toolbar"
	>
		<div class="component-toolbar">
			<span class="component-toolbar-item" @click="copyComponent">
				<copy-outlined />
			</span>
			<span class="component-toolbar-item" @click="deleteComponent">
				<delete-outlined />
			</span>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from "vue";
// import DemoForm from "./DemoForm.vue";
import { createUniqueId } from "@/utils";
import $ from "jquery";
import Sortable from "sortablejs";
// const components = [
// 	{
// 		component: "x-form",
// 		id: "form1",
// 		children: [],
// 	},
// ];
export default defineComponent({
	name: "App",
	setup() {
		return {
			mode: ref("design"),
			components: ref([]),
			componentMap: ref({}),
		};
	},
	mounted() {
		window.render = this.render;
		window.clickComponent = this.clickComponent;
		this.initParentMessage();
		this.initShadow();
	},
	watch: {
		components: {
			deep: true,
			handler() {
				window.parent.postMessage(
					{
						type: "componentsChange",
						components: JSON.stringify(this.components),
					},
					"*"
				);
				this.buildComponentMap();
			},
		},
	},
	methods: {
		buildComponentMap() {
			let map = {};
			this.components.forEach((it) => {
				map[it.id] = it;
				this.collectChildren(map, it);
			});
			this.componentMap = map;
		},
		initShadow() {
			Sortable.create(document.getElementById("shadow"), {
				group: {
					name: "shared",
					pull: "clone",
					put: false,
				},
			});
		},
		initSortable(id) {
			let componentMap = this.componentMap;
			let _this = this;
			let container = "#" + id + " .x-component-slot";
			$(container).each((i, el) => {
				Sortable.create(el, {
					group: {
						name: "shared",
						put: true,
						pull: false,
					},
					draggable: ".x-component",
					ghostClass: "ghost",
					onEnd(evt) {
						let parentEl = $(evt.item).parent(".x-component-slot");
						let pid = parentEl.attr("pid");
						let parent = componentMap[pid] || {};
						let children = [];
						parentEl.children(".x-component").each((i, el) => {
							let id = $(el).attr("id");
							if (!id) {
								return;
							}
							let c = componentMap[id];
							if (c) {
								children.push(c);
							} else {
								console.log("move error", id);
							}
						});
						parent.children = children;
						$(evt.item).click();
					},
					onChoose() {},

					onAdd(evt) {
						console.log("onAdd", evt);
						let meta = _this.$xmetas[window.toAddComponent];
						if (!meta) {
							return;
						}
						let child;
						if (meta.init && typeof meta.init === "function") {
							child = meta.init();
						} else {
							child = {
								id: createUniqueId(),
								component: window.toAddComponent,
							};
						}
						let parentId = $(el).attr("pid");
						let c = componentMap[parentId]?.children || [];
						if (c.length === 0) {
							c.push(child);
						} else {
							c.splice(evt.newIndex, 0, child);
						}

						componentMap[parentId].children = c;
						let cid = child.id;
						componentMap[cid] = child;
						_this.$nextTick(() => {
							_this.initSortable(cid);
							let target = $("#" + cid);
							target.click((e) => {
								e.stopPropagation();
								_this.bindComponentClick(target);
							});
							target.click();
						});
					},
				});
			});
		},

		initParentMessage() {
			let _this = this;
			window.onmessage = function (e) {
				if (e.data.type == "addComponent") {
					console.log("addComponent");
					window.toAddComponent = e.data.data.component;
					_this.initShadowAdd();
					//test();
				} else if (e.data.type === "onComponentDrop") {
					//dragEl.dispatchEvent(new DragEvent("dragend"));
					window.cloneHTML = "";
				}
			};
		},

		initShadowAdd() {
			let dragEl = document.getElementById("shadow").firstElementChild;
			var startEvt = new DragEvent("dragstart", { bubbles: true });
			var downEvt = new PointerEvent("pointerdown", {
				//    pointerId: 1,
				bubbles: true,
				cancelable: true,
				// pointerType: "touch",
				width: 100,
				height: 100,
				isPrimary: true,
			});
			dragEl.dispatchEvent(downEvt);
			dragEl.dispatchEvent(startEvt);
		},
		bindClick() {
			let _this = this;
			$(".x-component").click((e) => {
				e.stopPropagation();
				let target = $(e.target);
				if (target.hasClass("x-component")) {
					_this.bindComponentClick(target);
				} else if (target.parent().hasClass("x-component")) {
					//重新编辑的时候 target获取的是x-component-mask，需要获取其parent进行绑定
					_this.bindComponentClick(target.parent());
				}
			});
		},
		bindComponentClick(target) {
			let id = target.attr("id");
			console.log("bindComponentClick", target, id);
			window.parent.postMessage(
				{
					type: "clickComponent",
					id,
					component: target.attr("data-component"),
				},
				"*"
			);
			$(".x-component").removeClass("choosed");
			target.addClass("choosed");
			try {
				let offset = target.offset();
				this.showToolbar(
					id,
					offset.top,
					target.height(),
					offset.left + target.width()
				);
			} catch (e) {
				$("#toolbar").hide();
			}
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
		render(components) {
			if (!components || components.length === 0) {
				components = [{ id: "div", component: "x-div" }];
			}
			this.components = components;
			this.$nextTick(() => {
				this.initSortable("container");
				this.bindClick();
			});
		},
		clickComponent(id) {
			$("#" + id).click();
		},
		showToolbar(id, clientTop, clietHeight, clientRight) {
			let actionWidth = $("#toolbar").width();
			let actionHeight = $("#toolbar").height();
			let top = clientTop - actionHeight - 5;
			if (top < 0) {
				top = clientTop + clietHeight + 10;
			}
			$("#toolbar").css({
				top,
				left: clientRight - actionWidth + 5,
			});
			$("#toolbar").attr("target-id", id).show();
		},
		deleteComponent() {
			let id = $("#toolbar").attr("target-id");
			let r = this.removeComponent(this.components, id);
			if (r) {
				$("#toolbar").hide();
			}
			this.sendUnChoosed();
		},
		sendUnChoosed() {
			window.parent.postMessage(
				{
					type: "unChoosed",
				},
				"*"
			);
		},
		removeComponent(arr, id) {
			if (!arr || arr.length === 0) {
				return;
			}
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id === id) {
					arr.splice(i, 1);
					return true;
				}
				if (arr[i].children) {
					let r = this.removeComponent(arr[i].children, id);
					if (r) {
						return true;
					}
				}
			}
			return false;
		},
	},
});
</script>
<style>
#container {
	position: relative;
}
.hover {
	border: 1px dashed #197afe !important;
	pointer-events: none;
	z-index: 100;
}
.choosed {
	border: 2px solid #197afe !important;
	box-sizing: border-box !important;
}
.target-actions {
	position: fixed;
	top: -100px;
	left: -100px;
}
/* .x-component:hover {
	border: 1px dashed #197afe !important;
	pointer-events: none;
	display: block;
	opacity: 0.4;
} */
.x-component {
	position: relative;
	border: 2px solid transparent;
}
.x-component-placeholder {
	width: 100%;
	height: 40px;
	background: #197afe;
}
.x-component-mask {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2000;
}
.component-toolbar-container {
	position: absolute;
	display: none;
	z-index: 2000;
	opacity: 1;
}
.component-toolbar {
	display: flex;
	-webkit-transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.component-toolbar .component-toolbar-item {
	margin-left: 6px;
	padding: 0 4px;
	color: #e0e3e7;
	background: #1879ffde;
	border-radius: 5px;
	cursor: pointer;
}

.ghost {
	background-color: #197afe !important;
	font-size: 0;
	height: 0 !important;
	line-height: 0 !important;
	overflow: hidden;
	padding: 1px 0 !important;
	border: 1px solid #197afe !important;
}
</style>
