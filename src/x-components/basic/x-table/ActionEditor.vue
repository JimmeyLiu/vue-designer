<template>
	<a-drawer
		title="操作编辑"
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
			<a-form-item label="名称">
				<a-input v-model:value="data.title" />
			</a-form-item>
			<a-form-item label="操作类型">
				<a-radio-group v-model:value="data.actionType">
					<a-radio-button value="link"><a-tooltip title="打开链接">链接</a-tooltip></a-radio-button>
					<a-radio-button value="edit"><a-tooltip title="编辑行数据">编辑</a-tooltip></a-radio-button>
					<a-radio-button value="delete"><a-tooltip title="删除行数据">删除</a-tooltip></a-radio-button>
					<a-radio-button value="method"><a-tooltip title="执行方法">方法</a-tooltip></a-radio-button>
				</a-radio-group>
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
	actionType: "link",
	ellipsis: true,
};
export default defineComponent({
	mixins: [mixin],
	emits: ["change"],
	props: ["columns"],
	mounted() {},

	methods: {
		edit(record) {
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
.ant-radio-button-wrapper {
	padding: 0 10px;
}
</style>