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
				defaultValue="下拉框"
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
		<a-form-item label="宽度">
			<a-input-number
				style="width: 178px"
				v-model:value="formState.width"
				addon-after="px"
				@change="onChange"
			></a-input-number>
		</a-form-item>
		<a-form-item name="status" label="状态">
			<a-radio-group v-model:value="formState.status" @change="onChange">
				<a-radio-button value="normal">普通</a-radio-button>
				<a-radio-button value="disabled">禁用</a-radio-button>
			</a-radio-group>
			<aim-outlined />
		</a-form-item>
		<a-form-item label="清除按钮">
			<a-switch
				v-model:checked="formState.allowClear"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<a-form-item label="显示边框">
			<a-switch
				v-model:checked="formState.bordered"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<a-form-item label="显示箭头">
			<a-switch
				v-model:checked="formState.showArrow"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<a-form-item label="搜索模式">
			<a-switch
				v-model:checked="formState.showSearch"
				@change="onChange"
			></a-switch>
		</a-form-item>
		<a-collapse v-model:activeKey="activeKey" expandIconPosition="right">
			<a-collapse-panel key="1" header="选项">
				<a-radio-group
					v-model:value="formState.optionType"
					@change="onChange"
					style="margin: 10px"
				>
					<a-radio value="custom">自定义数据</a-radio>
					<a-radio value="remote">远程数据</a-radio>
				</a-radio-group>
				<template v-if="formState.optionType === 'custom'">
					<a-table
						size="small"
						:columns="[
							{
								title: '选中',
								key: 'checkbox',
								width: 50,
								align: 'center',
							},
							{ title: '值', key: 'value', width: 110 },
							{
								title: '标题',
								key: 'label',
								width: 100,
							},
							{
								title: '操作',
								key: 'action',
								width: 50,
								align: 'center',
							},
						]"
						:data-source="formState.options"
						:pagination="false"
					>
						<template #bodyCell="{ record, index, column }">
							<template v-if="column.key === 'checkbox'">
								<a-checkbox
									v-model:checked="record.checked"
								></a-checkbox>
							</template>
							<template v-else-if="column.key === 'label'">
								<a-input v-model:value="record.label" />
							</template>
							<template v-else-if="column.key === 'value'">
								<a-input v-model:value="record.value" />
							</template>
							<template v-else-if="column.key === 'action'">
								<a @click="deleteOption(index)"
									><delete-outlined
								/></a>
							</template>
						</template>
					</a-table>
					<div
						style="
							display: flex;
							text-align: center;
							justify-content: center;
						"
					>
						<a-button
							type="primary"
							style="width: 120px; margin: 10px"
							@click="addOption"
							>新增一项
						</a-button>
						<a-button
							type="primary"
							style="width: 120px; margin: 10px"
							@click="onChange"
							>保存
						</a-button>
					</div>
				</template>
				<template v-else>
					<a-form-item label="请求地址">
						<a-textarea v-model:value="formState.url" />
					</a-form-item>
					<a-form-item label="请求方式">
						<a-radio-group v-model:value="formState.methodType">
							<a-radio-button value="jsonp">JSONP</a-radio-button>
							<a-radio-button value="get">GET</a-radio-button>
							<a-radio-button value="post">POST</a-radio-button>
						</a-radio-group>
					</a-form-item>
				</template>
			</a-collapse-panel>
			<a-collapse-panel key="2" header="校验">
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
			<a-collapse-panel key="3" header="高级"> </a-collapse-panel>
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
	bordered: true,
	showArrow: true,
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