<template>
	<div class="blockly-container">
		<div id="blocklyDiv" ref="blocklyDiv"></div>
		<xml ref="blocklyToolbox" style="display: none">
			<slot></slot>
		</xml>
	</div>
</template>

<script>
// import BlocklyComponent from "../blockly/BlocklyComponent.vue";
// import "../blockly/stocks";
// import "../blockly/prompt";
import $ from "jquery";
import Blockly from "blockly";
import BlocklyJS from "blockly/javascript";
import { defineComponent, ref } from "vue";

export default defineComponent({
	components: {
		// BlocklyComponent,
	},
	setup() {
		const width = document.documentElement.clientWidth - 350;
		return {
			width: ref(width),
			code: ref(""),
			workspace: ref(null),
			options: ref({
				media: "media/",
				grid: {
					spacing: 10,
					length: 1,
					colour: "#ccc",
					snap: true,
				},
				toolbox: `<xml>
          <category name="逻辑" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
          </category>
          <category name="循环" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <block type="math_number">
                  <field name="NUM">10</field>
                </block>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
          </category>
          <category name="数字" colour="%{BKY_MATH_HUE}">
            <block type="math_number">
              <field name="NUM">123</field>
            </block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
          </category>
          <category name="文本" colour="%{BKY_TEXTS_HUE}">
            <block type="text"></block>
            <block type="text_length"></block>
            <block type="text_print"></block>
          </category>
          <category name="变量" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
            </category>
          <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
            <block type="stock_buy_simple"></block>
            <block type="stock_buy_prog"></block>
            <block type="stock_fetch_price"></block>
          </category>
        </xml>`,
			}),
		};
	},
	methods: {
		init() {
			let options = this.$refs["blocklyToolbox"];
			this.workspace = Blockly.inject(this.$refs["blocklyDiv"], options);
			console.log("init");
		},
		showCode() {
			this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);
		},
		open() {
			$("#javascript-pane").show();
		},
		close() {
			$("#javascript-pane").hide();
		},
	},
	mounted() {
		this.init();
	},
});
</script>

<style>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
