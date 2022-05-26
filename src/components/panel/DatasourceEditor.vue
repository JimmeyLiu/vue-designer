<template>
	<div v-if="visible" class="datasource-container">
		<div class="datasource-header">
			<div class="datasource-header-title">
				<span v-if="addMode">创建数据源</span>
				<span v-else>编辑数据源</span>
			</div>
			<div class="datasource-header-action">
				<a-button type="primary" @click="save" v-if="addMode"
					>保存</a-button
				>
				<span v-else style="cursor: pointer">
					<close-outlined @click="visible = false" />
				</span>
			</div>
		</div>
		<div class="datasource-body">
			<a-form
				:model="formState"
				v-bind="formItemLayout"
				@finishFailed="onFinishFailed"
				@finish="onFinish"
				:colon="false"
				labelAlign="left"
			>
				<a-form-item label="数据源ID">
					<a-input v-model:value="data.id" disabled />
				</a-form-item>
				<a-form-item label="名称">
					<a-input v-model:value="data.name" />
				</a-form-item>
				<a-form-item label="描述">
					<a-textarea v-model:value="data.desc" />
				</a-form-item>
				<a-form-item label="自动加载">
					<a-switch v-model:checked="data.auto" />
				</a-form-item>
				<a-form-item label="请求地址">
					<a-textarea v-model:value="data.url" />
				</a-form-item>
				<a-form-item label="请求方法">
					<a-radio-group v-model:value="data.method">
						<a-radio-button value="get">GET</a-radio-button>
						<a-radio-button value="post">POST</a-radio-button>
						<a-radio-button value="jsonp">JSONP</a-radio-button>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { createUniqueId, mergeObject } from "@/utils";
const defaultValues = {
	auto: false,
	method: "get",
};
export default defineComponent({
	props: ["components"],
	emits: ["create"],
	components: {},
	setup() {
		return {
			visible: ref(false),
			addMode: ref(false),
			data: ref([{ name: "getTableData" }]),
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
	methods: {
		edit(datasource) {
			this.addMode = false;
			this.visible = true;
			this.data = datasource;
			mergeObject(this.data, defaultValues);
		},
		create() {
			this.addMode = true;
			let data = { id: createUniqueId() };
			mergeObject(data, defaultValues);
			this.data = data;
			this.visible = true;
		},
		save() {
			this.visible = false;
			this.$emit("create", this.data);
		},
	},
});
</script>

<style scoped>
.datasource-container {
	position: absolute;
	left: 348px;
	top: 47px;
	width: 320px;
	z-index: 2000;
	background: #fff;
	border: 1px solid #eff2f5;
}
.datasource-header {
	height: 43px;
	line-height: 43px;
	border-bottom: 1px solid #eff2f5;
	display: flex;
}
.datasource-header-title {
	padding-left: 10px;
	font-size: 16px;
	width: 50%;
}
.datasource-header-action {
	text-align: right;
	width: 50%;
	padding-right: 10px;
}
.datasource-body {
	height: calc(100vh - 92px);
	padding: 10px;
	overflow: scroll;
}
</style>