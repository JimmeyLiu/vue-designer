<template>
	<a-tabs class="x-component x-tabs" :id="meta.id" data-component="x-tabs">
		<a-tab-pane
			v-for="pane in meta.children"
			:key="pane.id"
			:tab="pane.tab"
			:forceRender="true"
		>
			<x-component-slot
				:meta="pane"
				:data="data"
				:mode="mode"
				:pid="pane.id"
			/>
		</a-tab-pane>
	</a-tabs>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: ["meta", "data", "mode"],
	setup() {
		return {
			tabs: ref([]),
		};
	},
});
</script>
