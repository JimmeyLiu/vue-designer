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
		<a-form-item label="主题">
			<a-checkbox v-model:checked="formState.bordered"> 边框 </a-checkbox>
			<a-checkbox v-model:checked="formState.striped">
				斑马纹
			</a-checkbox>
			<a-checkbox v-model:checked="formState.compact">
				紧凑型
			</a-checkbox>
		</a-form-item>
		<a-form-item label="显示表头">
			<a-switch v-model:checked="formState.showHeader"></a-switch>
		</a-form-item>
		<a-form-item label="固定表头">
			<a-switch v-model:checked="formState.fixHeader"></a-switch>
			<span v-if="formState.fixHeader">
				高度
				<a-input-number
					v-model:checked="formState.scrollY"
					:defaultValue="200"
				/>
			</span>
		</a-form-item>
		<a-collapse
			v-model:activeKey="activeKey"
			expandIconPosition="right"
			:accordion="true"
		>
			<a-collapse-panel key="columns" header="数据列" :forceRender="true">
				<data-column v-model:columns="formState.columns" />
			</a-collapse-panel>
			<a-collapse-panel key="datasource" header="数据源">
				<data-source
					v-model:datasource="formState.datasource"
					:forceRender="true"
					:datasources="datasources"
				/>
			</a-collapse-panel>
			<a-collapse-panel key="actions" header="操作列">
				<action-column
					v-model:action="formState.action"
					:forceRender="true"
				/>
			</a-collapse-panel>
			<a-collapse-panel key="pagination" header="分页">
				<table-pagination
					v-model:pagination="formState.pagination"
					:forceRender="true"
				/>
			</a-collapse-panel>
			<a-collapse-panel key="advance" header="高级"> </a-collapse-panel>
		</a-collapse>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import TablePagination from "./TablePagination.vue";
import DataColumn from "./DataColumn.vue";
import DataSource from "./DataSource.vue";
import ActionColumn from "./ActionColumn.vue";

const form = {
	columns: [],
	actions: [],
	showHeader: true,
	pagination: {},
};
export default defineComponent({
	components: { TablePagination, DataColumn, ActionColumn, DataSource },
	props: ["meta", "datasources"],
	emits: ["change"],
	mounted() {
		let properties = this.meta.properties || {};
		Object.keys(form).forEach((key) => {
			if (properties[key] === undefined) {
				properties[key] = form[key];
			}
		});
		this.formState = properties;
		if (!this.formState.name) {
			this.formState.name = this.meta.id;
		}
	},
	watch: {
		formState: {
			deep: true,
			handler() {
				console.log("setColumns formState", this.formState);
				this.$emit("change", {
					id: this.meta.id,
					properties: this.formState,
				});
			},
		},
	},
	methods: {
		onChange() {
			// console.log("change", this.formState);
			// this.$emit("change", {
			// 	id: this.meta.id,
			// 	properties: this.formState,
			// });
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