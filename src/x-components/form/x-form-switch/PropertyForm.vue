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
		<a-form-item name="label" label="标题">
			<a-input
				v-model:value="formState.label"
				defaultValue="开关"
				@change="onChange"
			>
			</a-input>
		</a-form-item>
		<a-form-item name="label" label="显示冒号">
			<a-switch
				v-model:checked="formState.colon"
				checked-children="是"
				un-checked-children="否"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<a-form-item name="name" label="字段名">
			<a-input v-model:value="formState.name" defaultValue="text">
			</a-input>
		</a-form-item>

		<a-form-item name="status" label="状态">
			<a-radio-group v-model:value="formState.status" @change="onChange">
				<a-radio-button value="normal">普通</a-radio-button>
				<a-radio-button value="disabled">禁用</a-radio-button>
			</a-radio-group>
			<aim-outlined />
		</a-form-item>
		<a-form-item label="开启显示">
			<a-input
				v-model:value="formState.checkedChildren"
				@change="onChange"
			/>
		</a-form-item>
		<a-form-item label="关闭显示">
			<a-input
				v-model:value="formState.unCheckedChildren"
				@change="onChange"
			/>
		</a-form-item>
		<a-form-item label="默认值">
			<a-switch
				v-model:checked="formState.defaultValue"
				@change="onChange"
			/>
		</a-form-item>

		<a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
			<a-collapse-panel key="1" header="校验">
				<a-form-item label="数据格式">
					<a-select
						v-model:value="formState.format"
						:allowClear="true"
					>
						<a-select-option value="email">邮箱</a-select-option>
						<a-select-option value="phone">手机号</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="是否必填">
					<a-checkbox
						v-model:checked="formState.required"
					></a-checkbox>
					<a-input
						style="width: 200px; margin-left: 10px"
						v-if="formState.required"
						v-model:value="formState.requiredMessage"
						placeholder="输入错误信息"
					></a-input>
				</a-form-item>

				<a-form-item label="最小长度">
					<a-checkbox
						v-model:checked="formState.isMinLength"
					></a-checkbox>
					<a-input-number
						style="width: 200px; margin-left: 10px"
						v-if="formState.isMinLength"
						v-model:value="formState.minLength"
						placeholder="输入最小长度"
					></a-input-number>
				</a-form-item>
				<a-form-item label="最大长度">
					<a-checkbox
						v-model:checked="formState.isMaxLength"
					></a-checkbox>
					<a-input-number
						style="width: 200px; margin-left: 10px"
						v-if="formState.isMaxLength"
						v-model:value="formState.maxLength"
						placeholder="输入最大长度"
					></a-input-number>
				</a-form-item>
			</a-collapse-panel>
			<a-collapse-panel key="2" header="高级"> </a-collapse-panel>
		</a-collapse>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import lodash from "lodash";
const form = {
	options: [],
	status: "normal",
	optionType: "custom",
	methodType: "jsonp",
};
export default defineComponent({
	components: {},
	props: ["meta"],
	emits: ["change"],
	mounted() {
		let properties = this.meta.properties || {};
		this.formState = lodash.merge(form, properties);
		if (!this.formState.name) {
			this.formState.name = this.meta.id;
		}
	},
	watch: {},
	methods: {
		onChange() {
			this.$emit("change", {
				id: this.meta.id,
				properties: this.formState,
			});
		},
		addOption() {
			this.formState.options.push({});
		},
		deleteOption(index) {
			this.formState.options.splice(index, 1);
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
		const onFinish = (values) => {
			console.log("Success:", values);
		};

		const onFinishFailed = (errorInfo) => {
			console.log("Failed:", errorInfo);
		};

		return {
			formState: ref({}),
			activeKey: ref("1"),
			onFinish,
			onFinishFailed,
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