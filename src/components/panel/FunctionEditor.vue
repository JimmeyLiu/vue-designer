<template>
	<div v-if="visible" class="function-container">
		<div class="function-header">
			<div class="function-header-title">
				<span v-if="mode === 0">创建函数</span>
				<span v-else-if="mode === 2">查看函数</span>
				<span v-else>编辑函数</span>
			</div>
			<div class="function-header-action">
				<span style="cursor: pointer">
					<close-outlined @click="visible = false" />
				</span>
			</div>
		</div>
		<div class="function-body">
			<a-form v-bind="formItemLayout" :colon="false" labelAlign="left">
				<a-form-item label="函数ID">
					<a-input v-model:value="data.id" disabled />
				</a-form-item>
				<a-form-item label="名称">
					<a-input v-model:value="data.name" :disabled="mode === 2" />
				</a-form-item>
				<a-form-item label="代码">
					<code-mirror
						ref="cm"
						id="codemirror"
						:options="cmOption"
						v-model:value="data.code"
					/>
				</a-form-item>
				<a-form-item
					v-if="mode !== 2"
					:wrapper-col="{ offset: 2, span: 22 }"
				>
					<a-button type="primary" @click="save">保存</a-button>
					<a-button
						@click="
							save();
							visible = false;
						"
						style="margin-left: 10px"
					>
						保存并关闭
					</a-button>
					<a-alert
						v-if="error"
						:message="error.message"
						type="error"
						show-icon
						closable
						style="margin-top: 10px"
					/>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { createUniqueId, mergeObject, getQuery } from "@/utils";
import CodeMirror from "codemirror-editor-vue3";
// base style
import "codemirror/lib/codemirror.css";
// theme css
import "codemirror/theme/monokai.css";
require("codemirror/mode/javascript/javascript.js");
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/javascript-hint.js";

// 自动括号匹配功能
import "codemirror/addon/edit/matchbrackets";

// 高亮行功能
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/selection-pointer";

import Interpreter from "js-interpreter";

const defaultValues = {
	auto: false,
	method: "get",
};
export default defineComponent({
	props: ["components"],
	emits: ["create"],
	components: { CodeMirror },
	data() {
		return {
			visible: ref(false),
			mode: ref(0),
			data: ref([{ name: "getTableData" }]),
			error: ref(undefined),
			formItemLayout: {
				labelCol: {
					span: 2,
				},
				wrapperCol: {
					span: 22,
				},
			},
		};
	},
	computed: {
		cmOption() {
			return {
				tabSize: 4,
				foldGutter: true,
				styleActiveLine: true,
				lineNumbers: true,
				line: true,
				mode: "javascript",
				theme: "monokai",
				readOnly: this.mode === 2,
				extraKeys: {
					// 自动补全的按键事件
					//"'.'": completeAfter,
				},
				hintOptions: {
					completeSingle: false,
					tables: {
						user: ["name", "sex", "id"],
					},
				},
			};
		},
	},
	methods: {
		edit(datasource) {
			this.mode = 1;
			this.visible = true;
			this.data = datasource;
			mergeObject(this.data, defaultValues);
		},
		view(datasource) {
			this.mode = 2;
			this.visible = true;
			this.data = datasource;
		},
		create() {
			this.mode = 0;
			let data = { id: createUniqueId("fx") };
			mergeObject(data, defaultValues);
			this.data = data;
			this.visible = true;
		},
		hide() {
			this.visible = false;
		},
		save() {
			// this.visible = false;
			// this.$emit("create", this.data);
			try {
				let ds = {};
				let query = getQuery() || {};
				var initFunc = function (interpreter, scope) {
					interpreter.setProperty(
						scope,
						"console",
						interpreter.nativeToPseudo(console)
					);
					interpreter.setProperty(
						scope,
						"query",
						interpreter.nativeToPseudo(query)
					);
					interpreter.setProperty(
						scope,
						"ds",
						interpreter.nativeToPseudo(ds)
					);
					interpreter.setProperty(
						scope,
						"fx",
						interpreter.nativeToPseudo({})
					);
				};
				var intercepter = new Interpreter(this.data.code, initFunc);
				intercepter.run();
				this.error = undefined;
				this.$message.success("保存成功");
			} catch (e) {
				this.error = e;
			}
		},
		handleShowHint() {
			console.log("handleShowHint");
			const hintList = [
				{
					name: "xiaohong",
					value: "xiaohong",
				},
				{
					name: "xiaozhang",
					value: [
						{
							name: "xiaoli",
						},
						{
							name: "xiaosun",
						},
					],
				},
			];
			const cmInstance = this.$refs.cm.codemirror;
			console.log(cmInstance, 54);
			// 得到光标
			let cursor = cmInstance.getCursor();
			// 得到行内容
			let cursorLine = cmInstance.getLine(cursor.line);
			// 得到光标位置
			let end = cursor.ch;
			let start = end;
			const Two = `${cursorLine.charAt(start - 2)}${cursorLine.charAt(
				start - 1
			)}`;
			const One = `${cursorLine.charAt(start - 1)}`;
			let list = [];
			if (Two === "this.") {
				hintList.forEach((e) => {
					list.push(e.name);
				});
			} else if (One === ".") {
				let lastIndex = cursorLine.lastIndexOf("${", start);
				let key = cursorLine.substring(lastIndex + 2, start - 1);
				list = [];
				hintList.forEach((e) => {
					if (
						e.name === key &&
						lastIndex !== -1 &&
						Object.prototype.toString.call(e.value) ===
							"[object Array]"
					) {
						e.value.forEach((el) => {
							list.push(el.name);
						});
					}
				});
			}
			// 得到光标标识
			let token = cmInstance.getTokenAt(cursor);
			// console.log(cmInstance, cursor, cursorLine, end, token);
			return {
				list: list,
				from: { ch: end, line: cursor.line },
				to: { ch: token.end, line: cursor.line },
			};
		},
	},
	watch: {
		data: {
			deep: true,
			handler() {
				// this.error = undefined;
			},
		},
	},
});
</script>

<style scoped>
#codemirror {
	height: 300px;
	min-height: 300px;
	border: 1px solid #eff2f5;
	font-size: 14px;
}
.function-container {
	position: absolute;
	left: 348px;
	top: 47px;
	width: 640px;
	z-index: 100;
	background: #fff;
	border: 1px solid #eff2f5;
}
.function-header {
	height: 43px;
	line-height: 43px;
	border-bottom: 1px solid #eff2f5;
	display: flex;
}
.function-header-title {
	padding-left: 10px;
	font-size: 16px;
	width: 50%;
}
.function-header-action {
	text-align: right;
	width: 50%;
	padding-right: 10px;
}
.function-body {
	height: calc(100vh - 92px);
	padding: 10px;
	overflow: scroll;
}
</style>