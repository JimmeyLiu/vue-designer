<template>
	<a-table
		size="small"
		:columns="[
			{
				key: 'sort',
				width: 10,
			},
			{ title: '名称', key: 'name', width: 110 },
			{
				title: '标题',
				key: 'title',
				width: 100,
			},
			{
				title: '',
				key: 'action',
				width: 50,
				align: 'center',
			},
		]"
		:data-source="data"
		:pagination="false"
	>
		<template #bodyCell="{ record, index, column }">
			<template v-if="column.key === 'name'">
				<a-input v-model:value="record.dataIndex" @change="onChange" />
			</template>
			<template v-else-if="column.key === 'title'">
				<a-input v-model:value="record.title" @change="onChange" />
			</template>
			<template v-else-if="column.key === 'action'">
				<a @click="editColumn(record)" style="padding-right: 10px"
					><edit-outlined
				/></a>
				<a @click="deleteColumn(index)"><delete-outlined /></a>
			</template>
			<template v-else-if="column.key === 'sort'">
				<holder-outlined />
			</template>
		</template>
	</a-table>
	<div style="display: flex; text-align: center; justify-content: center">
		<a-button
			type="primary"
			style="width: 280px; margin: 10px"
			@click="addColumn"
			>新增一项
		</a-button>
	</div>
	<column-editor ref="columnEditor" @change="onColumnChange" />
</template>
<script>
import { defineComponent, ref } from "vue";
import lodash from "lodash";
import mixin from "../../mixin";
import ColumnEditor from "./ColumnEditor.vue";
export default defineComponent({
	components: { ColumnEditor },
	mixins: [mixin],
	props: ["columns"],
	emits: ["change"],
	mounted() {
		this.data = lodash.cloneDeep(this.columns) || [];
	},
	watch: {
		columns() {
			if (!this.init) {
				this.init = true;
				this.data = lodash.cloneDeep(this.columns) || [];
			}
		},
	},
	methods: {
		addColumn() {
			this.data.push({});
		},
		deleteColumn(index) {
			this.data.splice(index, 1);
			this.onChange();
		},
		editColumn(record) {
			this.record = record;
			this.$refs.columnEditor.editColumn(record);
		},
		onColumnChange(data) {
			this.mergeObject(this.record, data);
			this.onChange();
		},
		onChange() {
			console.log("setColumns update:columns");
			this.$emit("update:columns", this.data);
		},
	},

	setup() {
		return {
			init: ref(false),
			data: ref([]),
			record: ref(null),
		};
	},
});
</script>
<style>
.ant-table.ant-table-small .ant-table-tbody > tr > td {
	padding: 8px 2px;
}
</style>