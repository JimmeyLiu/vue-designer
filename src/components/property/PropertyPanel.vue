<template >
	<a-config-provider>
		<template #renderEmpty>
			<div style="text-align: center"><smile-outlined />请添加数据</div>
		</template>
		<component
			v-if="propertyForm"
			:is="propertyForm"
			:meta="current"
			:datasources="datasources"
			v-bind="$attrs"
		></component>
		<page-render v-else :components="components" />
	</a-config-provider>
</template>
<script>
import { defineComponent, ref } from "vue";
import PageRender from "../render/PageRender.vue";
export default defineComponent({
	components: { PageRender },
	props: ["datasources"],
	setup() {
		return {
			current: ref({}),
		};
	},
	mounted() {},
	computed: {
		components() {
			let meta = this.$xmetas[this.current.component];
			return (meta && meta.panel && meta.panel.property) || [];
		},
		propertyForm() {
			let meta = this.$xmetas[this.current.component];
			return (meta && meta.panel && meta.panel.propertyForm) || undefined;
		},
	},
	watch: {
		propertyValueMap() {
			console.log("propertyValueMap", this.propertyValueMap);
		},
	},
	methods: {
		valueChange(value) {
			console.log("valueChange", value);
			this.propertyValueMap[value.name] = value.value;
			console.log("this.propertyValueMap", this.propertyValueMap);
		},
		onClickComponent(data) {
			console.log("current edit", data);
			this.current = data;
		},
	},
});
</script>
<style scoped>
.ant-form-item {
	margin-bottom: 10px !important;
}
</style>