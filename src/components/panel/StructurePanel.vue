<template>
	<a-tree
		class="structrue-tree"
		draggable
		block-node
		:showLine="true"
		:tree-data="tree"
		@dragenter="onDragEnter"
		@drop="onDrop"
		@select="selectComponent"
		:defaultExpandAll="true"
		:autoExpandParent="true"
	>
		<template #switcherIcon="{}">
			<aim-outlined />
		</template>
	</a-tree>
</template>
<script>
// import { append } from "serialization/blocks";
import { defineComponent } from "vue";
import $ from "jquery";
export default defineComponent({
	props: ["components"],
	emits: ["sort"],
	components: {},
	setup() {
		const onDragEnter = (info) => {
			console.log(info);
		};

		return {
			onDragEnter,
		};
	},
	mounted() {},
	watch: {},
	computed: {
		tree() {
			console.log("tree", this.components);
			let tree = [];
			this.components.forEach((component) => {
				this.appendTree(tree, component);
			});
			return tree;
		},
	},
	methods: {
		onDrop(info) {
			console.log("drop", this.tree, info);
			this.$emit("sort", this.components);
			
		},
		appendTree(tree, component) {
			let title =
				(component.properties?.label || component.component) +
				"(" +
				component.id +
				")";
			let node = {
				title,
				key: component.id,
				children: [],
			};
			if (component.children && component.children.length > 0) {
				component.children.forEach((it) => {
					this.appendTree(node.children, it);
				});
			}
			tree.push(node);
		},
		selectComponent(k, e) {
			console.log(e.node);
			document
				.getElementById("simulator")
				.contentWindow.clickComponent(e.node.key);
		},
		onClickComponent(data) {
			$(".ant-tree-node-selected").removeClass("ant-tree-node-selected");
			$("[title*='(" + data.id + ")']").addClass(
				"ant-tree-node-selected"
			);
		},
	},
});
</script>