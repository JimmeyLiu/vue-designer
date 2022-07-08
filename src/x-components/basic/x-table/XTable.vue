<template>
	<div class="x-component x-table" data-component="x-table" :id="meta.id">
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-table
			:columns="columns"
			:bordered="bordered"
			:size="size"
			:rowClassName="rowClassName"
			:showHeader="showHeader"
			:scroll="scroll"
			:pagination="pagination"
			:dataSource="dataSource"
		>
			<template #bodyCell="{ column }">
				<template v-if="enableAction && column.dataIndex === 'action'">
					<template
						v-for="action in meta.properties.action.actions"
						:key="action.id"
					>
						<a-button
							class="action-button"
							:type="meta.properties.action.buttonType"
							>{{ action.title }}</a-button
						>
					</template>
				</template>
			</template>
		</a-table>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import mixin from "../../mixin";
import lodash from "lodash";
export default defineComponent({
	props: ["meta", "data", "mode"],
	name: "XTable",
	mixins: [mixin],
	mounted() {
		this.setColumns();
	},
	computed: {
		size() {
			let compact = this.getBooleanValue(
				this.meta.properties?.compact,
				false
			);
			return compact ? "small" : "default";
		},
		disabled() {
			return this.meta.properties?.status === "disabled";
		},
		bordered() {
			return this.getBooleanValue(this.meta.properties?.bordered, false);
		},
		showHeader() {
			return this.getBooleanValue(this.meta.properties?.showHeader, true);
		},
		showSearch() {
			return this.getBooleanValue(
				this.meta.properties?.showSearch,
				false
			);
		},
		style() {
			let style = {};
			let width = this.meta.properties?.width;
			if (width && width > 0) {
				style.width = width + "px";
			}
			return style;
		},

		scroll() {
			if (this.meta.properties?.fixHeader) {
				let y = this.meta.properties?.scrollY || 200;
				return {
					y,
				};
			}
			return null;
		},
	},

	setup() {
		return {
			value: ref(""),
			options: ref([]),
			columns: ref([]),
			dataSource: ref([]),
			enableAction: ref(false),
			pagination: ref(undefined),
		};
	},
	watch: {
		"meta.properties": {
			deep: true,
			handler() {
				this.setColumns();
			},
		},
	},
	methods: {
		setColumns() {
			console.log("setColumns");
			let c = this.meta.properties?.columns;
			let columns = lodash.cloneDeep(c) || [];
			let action = this.meta.properties?.action;
			this.enableAction = action && action.enabled;
			if (this.enableAction) {
				let fixed = action.fixed === "none" ? false : action.fixed;
				columns.push({
					dataIndex: "action",
					title: action.title,
					width: action.width,
					align: action.align,
					fixed,
				});
			}
			this.columns = columns;
			this.mockDataSource();
		},
		filterOption(input, option) {
			return (
				option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
				option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
			);
		},
		rowClassName(record, index) {
			if (this.meta.properties?.striped) {
				return index % 2 === 1 ? "table-striped" : "null";
			} else {
				return "";
			}
		},
		mockDataSource() {
			if (this.mode === "design" || this.mode === "preview") {
				let data = [];
				let count = this.meta.properties?.datasource?.mockCount || 2;
				for (let i = 0; i < count; i++) {
					let d = {};
					this.columns.forEach((it) => {
						if (it.dataIndex === "action") {
							return;
						}
						d[it.dataIndex] = it.title + "-" + i;
					});
					data.push(d);
				}
				this.dataSource = data;
			}
			this.buildPagination();
		},
		buildPagination() {
			let pagination = this.meta.properties?.pagination;
			if (!pagination || !pagination.enabled) {
				this.pagination = false;
				return;
			}
		},
	},
});
</script>
<style>
.table-striped td {
	background-color: #fafafa;
}
.action-button {
	padding: 0 4px !important;
	height: 24px;
	margin-left: 5px;
}
</style>