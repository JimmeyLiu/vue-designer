<template>
	<a-form
		:model="formState"
		v-bind="formItemLayout"
		@finishFailed="onFinishFailed"
		@finish="onFinish"
		:colon="false"
		labelAlign="left"
	>
		<a-form-item label="是否启用">
			<a-switch
				v-model:checked="data.enabled"
				checkedChildren="启用"
				unCheckedChildren="停用"
			/>
		</a-form-item>
		<template v-if="data.enabled">
			<a-form-item label="标题">
				<a-input v-model:value="data.title" />
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
			<a-form-item label="固定位置">
				<a-radio-group v-model:value="data.fixed">
					<a-radio-button value="none">
						<a-tooltip title="默认为不固定">默认</a-tooltip>
					</a-radio-button>
					<a-radio-button value="left">居左</a-radio-button>
					<a-radio-button value="right">居右</a-radio-button>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="按钮类型">
				<a-radio-group v-model:value="data.buttonType">
					<a-radio-button value="link">链接</a-radio-button>
					<a-radio-button value="button">按钮</a-radio-button>
				</a-radio-group>
			</a-form-item>
			<a-form-item label="操作项">
				<a-list size="small" :dataSource="data.actions" :split="false">
					<template #renderItem="{ item, index }">
						<a-list-item style="padding: '5px 10px'">
							<span style="cursor: pointer">
								<holder-outlined />
							</span>
							{{ item.title }}
							<template #actions>
								<a
									key="list-loadmore-edit"
									@click="editAction(item)"
									><edit-outlined
								/></a>
								<a
									key="list-loadmore-more"
									@click="deleteAction(index)"
									><delete-outlined
								/></a>
							</template>
						</a-list-item>
					</template>
				</a-list>
				<a @click="addAction"><plus-outlined />添加操作</a>
			</a-form-item>
		</template>
	</a-form>
	<action-editor ref="actionEditor" @change="onColumnChange" />
</template>
<script>
import { defineComponent, ref } from "vue";
import lodash from "lodash";
import mixin from "../../mixin";
import ActionEditor from "./ActionEditor.vue";
const defaultValues = {
	enabled: false,
	align: "left",
	fixed: "none",
	actions: [],
	buttonType: "link",
	width: 100,
	title: "操作",
};
export default defineComponent({
	components: { ActionEditor },
	mixins: [mixin],
	props: ["action"],
	mounted() {
		let action = lodash.cloneDeep(this.action) || {};
		this.data = this.mergeObject(action, defaultValues);
	},
	watch: {
		data: {
			deep: true,
			handler() {
				this.onChange();
			},
		},
	},
	methods: {
		addAction() {
			let action = { title: "操作" };
			this.data.actions.push(action);
			this.editAction(action);
		},
		editAction(item) {
			this.$refs.actionEditor.edit(item);
		},
		deleteAction(index) {
			this.data.actions.splice(index, 1);
		},
		onChange() {
			this.$emit("update:action", this.data);
		},
	},

	setup() {
		return {
			init: ref(false),
			data: ref([]),
			record: ref(null),
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
.ant-list-item {
	border: 1px solid #eff2f5;
	margin-bottom: 10px;
	padding: 8px 5px !important;
}
.ant-list-split .ant-list-item:last-child {
	border-bottom: 1px solid #eff2f5;
}
</style>