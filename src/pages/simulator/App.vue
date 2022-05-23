<template>
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
		};
	},
	computed: {
		componentMap() {
			let map = {};
			this.components.forEach((it) => {
				map[it.id] = it;
				this.collectChildren(map, it);
			});
			return map;
		},
	},
	mounted() {
		window.render = this.render;
		window.clickComponent = this.clickComponent;
		// this.bindDnd();
		// this.bindSortable("container");
		this.bindClickBlank();
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
			},
		},
	},
	methods: {
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
				this.bindDnd();
				this.bindSortable("container");
			});
		},
		clickComponent(id) {
			$("#" + id).click();
		},
		bindSortable(id) {
			window.toAddComponent = null;
			let localSort = false;
			let componentMap = this.componentMap;
			let _this = this;
			let container = "#" + id + " .x-component-slot";
			$(container).each((i, el) => {
				Sortable.create(el, {
					group: id,
					animation: 150,
					draggable: ".x-component",
					onStart: function (/**Event*/) {
						localSort = true;
						window.dragging = true;
						$("#toolbar").hide();
						$("#container .x-component")
							.removeClass("hover")
							.removeClass("choosed");
					},
					onEnd: function (evt) {
						window.dragging = false;
						$(evt.item).click();
						let pid = $(el).attr("pid");
						let component = _this.componentMap[pid];
						if (component && component.children) {
							component.children = _this.moveItem(
								component.children,
								evt.oldIndex,
								evt.newIndex
							);
						}
						localSort = false;
					},
				});

				el.addEventListener("dragleave", (e) => {
					if (localSort) {
						return;
					}
					if (_this.notInContainer(el, e)) {
						$(e.target).removeClass("hover");
					}
					e.stopPropagation();
				});
				el.addEventListener("dragover", (e) => {
					e.preventDefault();
				});
				el.addEventListener("dragenter", (e) => {
					if (localSort) {
						return;
					}
					// $(e.target).addClass("hover");
					e.stopPropagation();
				});
				el.addEventListener("drop", (e) => {
					if (localSort) {
						return;
					}
					e.stopPropagation();
					console.log("toAddComponent", window.toAddComponent);
					let meta = this.$xmetas[window.toAddComponent];
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
					c.push(child);
					componentMap[parentId].children = c;
					let cid = child.id;
					_this.$nextTick(() => {
						_this.bindSortable(cid);
						let target = $("#" + cid);
						target.click((e) => {
							e.stopPropagation();
							_this.bindComponentClick(target);
						});
						target.click();
					});
				});
			});
			window.onmessage = function (e) {
				if (e.data.type == "addComponent") {
					// el = e.data.data.innerHTML;
					window.toAddComponent = e.data.data.component;
				} else if (e.data.type === "onComponentDrop") {
					//
					window.toAddComponent = null;
				}
			};
			document.addEventListener("drop", (e) => {
				console.log("child dragend", e);
			});
		},

		dispatchParentEvent() {},
		bindDnd() {
			// let actionHeight = $("#toolbar").height();

			$(".x-component").mouseover(function (e) {
				e.stopPropagation();
			});
			$(".x-component").mouseleave(function (e) {
				e.stopPropagation();
			});
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

		deleteComponent() {
			let id = $("#toolbar").attr("target-id");
			let r = this.removeComponent(this.components, id);
			if (r) {
				$("#toolbar").hide();
			}
			this.sendUnChoosed();
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
		notInContainer(el, e) {
			let x = e.pageX;
			let y = e.pageY;
			let div = $(el); //获取你想要的DIV
			let y1 = div.offset().top; //div上面两个的点的y值
			let y2 = y1 + div.height(); //div下面两个点的y值
			let x1 = div.offset().left; //div左边两个的点的x值
			let x2 = x1 + div.width(); //div右边两个点的x的值
			console.log("notInContainer", x, x1, x2, y, y1, y2);
			return x < x1 || x > x2 || y < y1 || y > y2;
		},
		//点击非组件元素区域把旋转状态等清除
		bindClickBlank() {
			let _this = this;
			$("body").click(function () {
				$("#toolbar").hide();
				$(".hover").removeClass("hover");
				$(".choosed").removeClass("choosed");
				_this.sendUnChoosed();
			});
		},
		sendUnChoosed() {
			window.parent.postMessage(
				{
					type: "unChoosed",
				},
				"*"
			);
		},

		// fromIndex: 当前元素所在位置索引, toIndex: 移动到指定索引
		moveItem(arr, fromIndex, toIndex) {
			for (var k in arr) {
				var item = arr[k];
				if (k == fromIndex) {
					arr.splice(k, 1);
					arr.splice(toIndex, 0, item);
					break;
				}
			}
			return arr;
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
</style>
