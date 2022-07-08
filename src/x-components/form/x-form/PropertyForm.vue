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
		<a-form-item label="表单布局">
			<a-radio-group v-model:value="formState.layout">
				<a-radio-button value="horizontal">水平</a-radio-button>
				<a-radio-button value="vertical">垂直</a-radio-button>
				<a-radio-button value="inline">内联</a-radio-button>
			</a-radio-group>
		</a-form-item>
		<template v-if="formState.layout === 'horizontal'">
			<a-form-item label="标题冒号">
				<a-switch v-model:checked="formState.colon" />
			</a-form-item>
			<a-form-item label="标题对齐">
				<a-radio-group v-model:value="formState.labelAlign">
					<a-radio-button value="left">左对齐</a-radio-button>
					<a-radio-button value="right">右对齐</a-radio-button>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="标题宽">
				<a-input-number v-model:value="formState.labelSpan" />
			</a-form-item>
			<a-form-item label="控件宽">
				<a-input-number
					v-model:value="formState.wrapperSpan"
				/> </a-form-item
		></template>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import { mergeObject } from "@/utils";
const form = {
	layout: "horizontal",
	colon: true,
	labelAlign: "right",
	labelSpan: 6,
	wrapperSpan: 18,
};
export default defineComponent({
	components: {},
	props: ["meta"],
	emits: ["propertyChange"],
	mounted() {
		let properties = this.meta.properties || {};
		this.formState = mergeObject(properties, form);
	},
	watch: {
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
	padding: 10px 0 !important;
}
.ant-collapse {
	border: 0 !important;
}
.ant-collapse > .ant-collapse-item {
	border: 0 !important;
}
</style>