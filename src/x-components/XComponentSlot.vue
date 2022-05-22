<template>
	<div class="x-component-slot">
		<template v-if="meta && meta.children && meta.children.length > 0">
			<component
				v-for="child in meta.children"
				:key="child.id"
				:is="child.component"
				:meta="child"
				:data="data"
				:mode="mode"
			/>
		</template>
		<div v-if="mode === 'design'" class="x-component-slot-placeholder">拖拽组件到这里</div>
	</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: ["meta", "data", "mode"],
	setup() {},
	computed: {
		slotClass() {
			if (this.mode === "production") {
				return [];
			}
			let l = ["x-component-slot"];
			if (
				!this.meta ||
				!this.meta.children ||
				this.meta.children.length === 0
			) {
				l.push("x-component-slot-placeholder");
			}
			return l;
		},
	},
});
</script>
<style scoped>
.x-component-slot-placeholder {
	min-height: 30px;
	height: 100%;
	width: 100%;
	background-color: #f0f0f0;
	border: 1px dotted;
	color: #a7b1bd;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	font-size: 14px;
}
</style>
