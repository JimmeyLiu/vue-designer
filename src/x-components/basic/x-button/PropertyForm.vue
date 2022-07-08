<template>
	<a-form
		:model="formState"
		name="validate_other"
		v-bind="formItemLayout"
		@finishFailed="onFinishFailed"
		@finish="onFinish"
		:colon="false"
		labelAlign="left"
	>
		<a-form-item label="名称">
			<a-input style="width: 120px" v-model:value="formState.name">
			</a-input>
		</a-form-item>
		<a-form-item label="按钮类型">
			<a-select v-model:value="formState.type" :options="types">
			</a-select>
		</a-form-item>
		<a-form-item label="按钮形状">
			<a-radio-group v-model:value="formState.shape">
				<a-radio-button value="default">默认</a-radio-button>
				<a-radio-button value="circle">圆形</a-radio-button>
				<a-radio-button value="round">椭圆形</a-radio-button>
			</a-radio-group>
		</a-form-item>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";
// import lodash from "lodash";
import { mergeObject } from "@/utils";
const form = {
	name: "按钮",
	size: "middle",
	type: "default",
	disabled: false,
	shape: "default",
};
const types = [
	{
		value: "default",
		label: "默认",
	},
	{
		value: "primary",
		label: "主题",
	},
	{
		value: "link",
		label: "链接形式",
	},
	{
		value: "text",
		label: "文本形式",
	},
	{
		value: "dashed",
		label: "虚线框",
	},
	{
		value: "ghost",
		label: "透明背景",
	},
];
export default defineComponent({
	components: {},
	props: ["meta"],
	emits: ["propertyChange"],
	mounted() {
		let properties = this.meta.properties || {};
		this.formState = mergeObject(properties, form);
	},
	watch: {
		meta() {
			let properties = this.meta.properties || {};
			this.formState = mergeObject(properties, form);
		},
		formState: {
			deep: true,
			handler() {
				this.onChange();
			},
		},
	},
	methods: {
		onChange() {
			this.$emit("propertyChange", {
				id: this.meta.id,
				properties: this.formState,
			});
		},
	},

	setup() {
		const formItemLayout = {
			labelCol: {
				span: 6,
			},
			wrapperCol: {
				span: 18,
			},
		};

		return {
			formState: ref({}),
			types,
			formItemLayout,
		};
	},
});
</script>
<style>
.ant-collapse > .ant-collapse-item > .ant-collapse-header {
	padding: 5px !important;
	border-top: 1px solid #d9d9d9 !important;
	background: #eff2f5;
}
.ant-collapse-content > .ant-collapse-content-box {
	padding: 6px 0 !important;
}
.ant-collapse {
	border: 0 !important;
}
.ant-collapse > .ant-collapse-item {
	border: 0 !important;
}
</style>