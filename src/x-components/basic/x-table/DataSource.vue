<template>
	<a-form
		:model="data"
		v-bind="formItemLayout"
		@finishFailed="onFinishFailed"
		@finish="onFinish"
		:colon="false"
		labelAlign="left"
	>
		<a-form-item label="模拟数量">
			<a-input-number v-model:value="data.mockCount" />
		</a-form-item>
		<a-form-item label="数据源">
			<a-select v-model:value="data.datasource" :options="options">
			</a-select>
		</a-form-item>
	</a-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import lodash from "lodash";
import mixin from "../../mixin";
export default defineComponent({
	components: {},
	mixins: [mixin],
	props: ["datasource", "datasources"],
	mounted() {
		this.data = lodash.cloneDeep(this.datasource) || {};
	},
	watch: {
		data: {
			deep: true,
			handler() {
				this.$emit("update:datasource", this.data);
			},
		},
	},
	computed: {
		options() {
			let options = [];
			this.datasources.forEach((it) => {
				options.push({ value: it.id, label: it.name });
			});
			return options;
		},
	},
	methods: {},

	setup() {
		return {
			data: ref({}),
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
<style>
.ant-table.ant-table-small .ant-table-tbody > tr > td {
	padding: 8px 2px;
}
</style>