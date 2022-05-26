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
				style="width: 120px"
				v-model:value="formState.label"
				defaultValue="单行文本"
				@change="onChange"
			>
			</a-input>
			<span>
				显示冒号
				<a-switch
					v-model:checked="formState.colon"
					checked-children="是"
					un-checked-children="否"
					@change="onChange"
				></a-switch
			></span>
		</a-form-item>
		<a-form-item name="name" label="字段名">
			<a-input v-model:value="formState.name" defaultValue="text">
			</a-input>
		</a-form-item>
		<a-form-item name="defaultValue" label="默认值">
			<a-input v-model:value="formState.defaultValue" @change="onChange">
			</a-input>
		</a-form-item>
		<a-form-item name="placeholder" label="占位提示">
			<a-input v-model:value="formState.placeholder" @change="onChange">
			</a-input>
		</a-form-item>
		<!-- <a-form-item name="size" label="尺寸">
			<a-radio-group v-model:value="formState.size">
				<a-radio-button value="large">大</a-radio-button>
				<a-radio-button value="middle">中</a-radio-button>
				<a-radio-button value="small">小</a-radio-button>
			</a-radio-group>
		</a-form-item> -->
		<a-form-item label="宽度">
			<a-input-number
				style="width: 178px"
				v-model:value="formState.width"
				addon-after="px"
				@change="onChange"
			></a-input-number>
		</a-form-item>
		<a-form-item name="type" label="类型">
			<a-radio-group v-model:value="formState.type" @change="onChange">
				<a-radio-button value="input">单行</a-radio-button>
				<a-radio-button value="textarea">多行</a-radio-button>
				<a-radio-button value="password">密码</a-radio-button>
			</a-radio-group>
		</a-form-item>
		<a-form-item name="status" label="状态">
			<a-radio-group v-model:value="formState.status" @change="onChange">
				<a-radio-button value="normal">普通</a-radio-button>
				<a-radio-button value="readonly">只读</a-radio-button>
				<a-radio-button value="disabled">禁用</a-radio-button>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="显示字数" v-if="formState.type === 'input'">
			<a-switch
				v-model:checked="formState.showCount"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<a-form-item label="清除按钮">
			<a-switch
				v-model:checked="formState.allowClear"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<!-- <a-form-item name="autofocus" label="自动聚焦">
			<a-switch
				v-model:checked="formState.autofocus"
				@change="onChange"
			></a-switch>
		</a-form-item> -->
		<a-collapse expandIconPosition="right">
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
	status: "normal",
	size: "middle",
	placeholder: "Please enter",
	type: "input",
	count: false,
	maxCount: 200,
	clear: false,
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
			console.log("formState change");
			this.$emit("change", {
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
		const onFinish = (values) => {
			console.log("Success:", values);
		};

		const onFinishFailed = (errorInfo) => {
			console.log("Failed:", errorInfo);
		};

		return {
			formState: ref({}),
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
	padding: 6px 0 !important;
}
.ant-collapse {
	border: 0 !important;
}
.ant-collapse > .ant-collapse-item {
	border: 0 !important;
}
</style>