<template>
	<div class="skeleton-toolbar-container">
		<div class="skeleton-toolbar-left"></div>
		<div class="skeleton-toolbar-center"></div>
		<div class="skeleton-toolbar-right">
			<a-button type="link" style="padding: 0 5px" disabled
				><redo-outlined
			/></a-button>
			<a-button type="link" style="padding: 0 5px" disabled
				><undo-outlined
			/></a-button>
		</div>
	</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
	setup() {},
});
</script>
<style scoped>
.skeleton-toolbar-container {
	display: flex;
	width: 100%;
}
.skeleton-toolbar-left {
	width: 33%;
}
.skeleton-toolbar-center {
	width: 33%;
}
.skeleton-toolbar-right {
	width: 33%;
	text-align: right;
}
</style>