<template >
	<page-render :components="components" />
</template>
<script>
import { defineComponent, ref } from "vue";
import PageRender from "../render/PageRender.vue";
export default defineComponent({
	components: { PageRender },
	// props: ["propertyMetas", "propertyValues"],
	setup() {
		return {
			current: ref({}),
		};
	},
	mounted() {},
	computed: {
		components() {
			return this.$xmetas[this.current.component] || [];
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