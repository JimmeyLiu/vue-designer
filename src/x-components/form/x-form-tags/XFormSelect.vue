<template>
	<div class="x-component x-form-tags" data-component="x-form-tags" :id="meta.id">
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label">
			<a-select
				v-model:value="value"
				:placeholder="meta.description"
				mode="tags"
				:options="options"
			/>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XFormSelect",
	mounted() {
		this.value = this.meta.defaultValue || [];
	},
	computed: {
		label() {
			return this.meta.properties?.label || "标签";
		},
		options() {
			return [];
		},
	},

	setup() {
		return {
			value: ref([]),
		};
	},
});
</script>