<template>
	<x-skeleton />
	<!-- <BlocklyPanel /> -->
</template>

<script>
// import BlocklyPanel from "./components/panel/BlocklyPanel.vue";
import XSkeleton from "@/components/Skeleton.vue";
export default {
	name: "App",
	components: {
		// BlocklyPanel,
		XSkeleton,
	},
};
</script>
<style>
.ant-form-item {
	margin: 5px !important;
}
</style>

