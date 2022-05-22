<template>
	<component
		v-for="cmp in components"
		:key="cmp.id"
		:is="cmp.component"
		:meta="cmp"
		:data="data"
		:mode="mode"
	/>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
	//components 是实例数据
	props: ["components", "data"],
	setup() {
		return {
			mode: "production",
		};
	},
	watch: {
		components() {
			console.log("render components");
		},
	},
	mounted() {
		console.log("render components");
	},
});
</script>
