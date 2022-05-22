<template >
	<a-form :label-col="{ span: 6 }" labelAlign="left">
		<template
			v-for="prop in propertyMetas"
			:key="prop.name"
			:wrapperCol="{ marginBottom: '10px' }"
		>
			<prop-input
				:colon="false"
				:propMeta="prop"
				v-model:propValues="propertyValueMap"
				v-if="prop.component === 'input'"
				@valueChange="valueChange"
			/>
			<prop-select
				:colon="false"
				:propMeta="prop"
				v-model:propValues="propertyValueMap"
				v-else-if="prop.component === 'select'"
				@valueChange="valueChange"
			/>
			<prop-radio
				:colon="false"
				:propMeta="prop"
				v-model:propValues="propertyValueMap"
				v-else-if="prop.component === 'radio'"
				@valueChange="valueChange"
			/>
			<prop-switch
				:colon="false"
				:propMeta="prop"
				v-model:propValues="propertyValueMap"
				v-else-if="prop.component === 'switch'"
				@valueChange="valueChange"
			/>
			<prop-input-number
				:colon="false"
				:propMeta="prop"
				v-model:propValues="propertyValueMap"
				v-else-if="prop.component === 'input-number'"
				@valueChange="valueChange"
			/>
		</template>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import PropInput from "./component/PropInput.vue";
import PropSelect from "./component/PropSelect.vue";
import PropRadio from "./component/PropRadio.vue";
import PropSwitch from "./component/PropSwitch.vue";
import PropInputNumber from "./component/PropInputNumber.vue";
//这是antdv Input组件属性配置
const propertyMetas = [
	{
		name: "allowClear",
		component: "switch",
		title: "清除图标",
	},
	{
		name: "disabled",
		component: "switch",
		title: "是否禁用",
		defaultValue: true,
	},
	{
		name: "bordered",
		component: "switch",
		title: "是否有边框",
		defaultValue: true,
	},
	{
		name: "maxlength",
		component: "input-number",
		title: "最大长度",
	},
];
export default defineComponent({
	components: {
		PropInput,
		PropSelect,
		PropRadio,
		PropSwitch,
		PropInputNumber,
	},
	// props: ["propertyMetas", "propertyValues"],
	setup() {
		return {
			propertyMetas,
			propertyValueMap: ref({
				gender: "man",
			}),
		};
	},
	mounted() {
		this.bindComponentClick();
	},
	watch: {
		propertyValueMap() {
			console.log("propertyValueMap", this.propertyValueMap);
		},
	},
	methods: {
		bindComponentClick() {
			window.onmessage = function (e) {
				if (e.data.type !== "clickComponent") {
					// el = e.data.data.innerHTML;
					return;
				}
				console.log("property panel hint", e);
			};
		},
		valueChange(value) {
			console.log("valueChange", value);
			this.propertyValueMap[value.name] = value.value;
			console.log("this.propertyValueMap", this.propertyValueMap);
		},
	},
});
</script>
<style scoped>
.ant-form-item {
	margin-bottom: 10px !important;
}
</style>