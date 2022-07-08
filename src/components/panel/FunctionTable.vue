<template>
	<a-table
		size="small"
		:columns="[
			{
				dataIndex: 'name',
				title: '名称',
				width: 100,
				ellipsis: true,
			},
			{
				dataIndex: 'id',
				title: '函数ID',
				width: 130,
				ellipsis: true,
			},
			{
				dataIndex: 'ref',
				title: '引用',
				width: 40,
				align: 'center',
			},
		]"
		:customRow="customRow"
		:dataSource="functions"
		:defaultExpandAllRows="true"
		:pagination="false"
	>
		<template #bodyCell="{ record, column }">
			<template v-if="column.dataIndex === 'ref'">
				<a-badge
					:count="record.ref"
					:number-style="{ backgroundColor: '#2db7f5' }"
				/>
			</template>
		</template>
	</a-table>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	props: {
		components: { type: Array },
		datasources: { type: Array },
		onRowClick: {
			type: Function,
			required: true,
		},
	},
	components: {},
	setup() {
		return {
			current: ref(undefined),
			activeKey: ref("builtin"),
			functions: ref([
				{
					id: "getValue_xv12ffsa23",
					name: "获取表单数据",
					ref: 3,
				},
				{
					id: "reset_xv12ffsa23",
					name: "清空表单",
					ref: 2,
				},
			]),
		};
	},
	computed: {
		meta() {
			return this.current && this.$xmetas[this.current.component];
		},
	},
	methods: {
		onClickFunction(record) {
			console.log(record);
			//this.current = data;
			// this.$refs.propertyPanel.onClickComponent(data);
		},
		customRow(record) {
			return {
				onClick: () => this.onRowClick(record),
			};
		},
	},
});
</script>
<style>
#setter-panel .ant-tabs-content {
	padding: 10px 0 !important;
}
#setter-panel .ant-tabs-tabpane {
	height: calc(100vh - 110px);
	overflow-y: scroll;
	padding-bottom: 20px;
}
</style>