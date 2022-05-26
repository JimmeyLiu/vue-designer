<template>
	<div style="padding: 10px">
		<div style="margin-bottom: 10px">
			<a-button type="primary" @click="createDatasource">添加</a-button>
		</div>
		<div>
			<a-list size="small" :dataSource="data" :split="false">
				<template #renderItem="{ item, index }">
					<a-list-item style="padding: '5px 10px'">
						<span>
							<holder-outlined />
							<a-tag color="blue">远程</a-tag>
							<span class="datasource-title">{{
								item.name
							}}</span>
						</span>

						<template #actions>
							<a
								key="list-loadmore-edit"
								@click="editDatasource(item)"
								><edit-outlined
							/></a>
							<a
								key="list-loadmore-edit"
								@click="copyDatasource(item)"
								><copy-outlined
							/></a>
							<a
								key="list-loadmore-more"
								@click="deleteDatasource(index)"
								><delete-outlined
							/></a>
						</template>
					</a-list-item>
				</template>
			</a-list>
		</div>
	</div>
	<datasource-editor ref="datasourceEditor" @create="onCreated" />
</template>
<script>
import { defineComponent, ref } from "vue";
import DatasourceEditor from "./DatasourceEditor.vue";
import lodash from "lodash";
import { createUniqueId } from "@/utils";

export default defineComponent({
	props: ["datasources"],
	emits: ["update"],
	components: { DatasourceEditor },
	setup() {
		return {
			data: ref([]),
		};
	},
	mounted() {
		this.data = this.datasources;
	},
	watch: {
		data: {
			deep: true,
			handler() {
				this.$emit("update", this.data);
			},
		},
	},
	methods: {
		editDatasource(item) {
			this.$refs.datasourceEditor.edit(item);
		},
		createDatasource() {
			this.$refs.datasourceEditor.create();
		},
		copyDatasource(item) {
			let d = lodash.cloneDeep(item);
			d.id = createUniqueId();
			this.data.push(d);
			this.$refs.datasourceEditor.edit(d);
		},
		deleteDatasource(index) {
			this.data.splice(index, 1);
		},
		onCreated(datasource) {
			this.data.push(datasource);
		},
	},
});
</script>

<style scoped>
.datasource-title {
	width: 120px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: inline-block;
	vertical-align: middle;
}
.ant-list-item {
	border: 1px solid #eff2f5;
	margin-bottom: 10px;
	padding: 5px !important;
}
.ant-list-split .ant-list-item:last-child {
	border-bottom: 1px solid #eff2f5;
}
.ant-tag {
	border: 0;
}
.ant-drawer-content-wrapper {
	box-shadow: -1px 0 1px -8px rgb(0 0 0 / 8%), -1px 0 1px 0 rgb(0 0 0 / 5%),
		-1px 0 1px 0 rgb(0 0 0 / 3%);
}
</style>
<style>
.ant-list-item-action {
	margin-left: 0 !important;
}
</style>