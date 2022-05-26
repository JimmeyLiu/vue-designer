<template>
	<a-drawer
		title="数据列"
		:visible="visible"
		:placement="right"
		:width="320"
		:closable="false"
		@close="onClose"
		:getContainer="false"
		:maskStyle="{ backgroundColor: 'rgba(0, 0, 0, 0)' }"
		:bodyStyle="{ padding: '10px' }"
		:headerStyle="{ height: '42px', padding: '16px 10px' }"
		:style="{ position: 'absolute' }"
	>
		<a-form
			:model="formState"
			v-bind="formItemLayout"
			@finishFailed="onFinishFailed"
			@finish="onFinish"
			:colon="false"
			labelAlign="left"
		>
			<a-form-item label="标题">
				<a-input v-model:value="data.title" />
			</a-form-item>
			<a-form-item label="数据字段">
				<a-input v-model:value="data.dataIndex" />
			</a-form-item>
			<a-form-item label="数据类型">
				<a-input v-model:value="data.dataType" />
			</a-form-item>
			<a-form-item label="编辑格式">
				<a-input v-model:value="data.eidtTpye" />
			</a-form-item>
			<a-form-item label="宽度">
				<a-input-number v-model:value="data.width" />
			</a-form-item>
			<a-form-item label="对齐方式">
				<a-radio-group v-model:value="data.align">
					<a-radio-button value="left">居左</a-radio-button>
					<a-radio-button value="center">居中</a-radio-button>
					<a-radio-button value="right">居右</a-radio-button>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="超宽省略">
				<a-switch v-model:checked="data.ellipsis" />
			</a-form-item>
		</a-form>
		<template #extra>
			<span style="cursor: pointer" @click="onClose">
				<logout-outlined />
			</span>
		</template>
	</a-drawer>
</template>
<script>
import { defineComponent, ref } from "vue";
import mixin from "../../mixin";
const defaultValue = {
	align: "left",
	ellipsis: true,
};
export default defineComponent({
	mixins: [mixin],
	emits: ["change"],
	props: ["columns"],
	mounted() {},

	methods: {
		editColumn(record) {
			this.data = this.mergeObject(record, defaultValue);
			this.visible = true;
		},
		onClose() {
			this.$emit("change", this.data);
			this.visible = false;
		},
	},

	setup() {
		return {
			data: ref([]),
			visible: ref(false),
			formItemLayout: {
				labelCol: {
					span: 6,
				},
				wrapperCol: {
					span: 18,
				},
			},
		};
	},
});
</script>
<style scoped>
.ant-drawer-content-wrapper {
	box-shadow: -1px 0 1px -8px rgb(0 0 0 / 8%), -1px 0 1px 0 rgb(0 0 0 / 5%),
		-1px 0 1px 0 rgb(0 0 0 / 3%);
}
</style>