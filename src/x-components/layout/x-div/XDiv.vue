<template>
	<div class="x-component x-div" :id="meta.id" data-component="x-div">
		<x-component-slot
			:meta="meta"
			:data="data"
			:mode="mode"
			:pid="meta.id"
		/>
	</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: ["meta", "data", "mode"],
	setup() {},
});
</script>
