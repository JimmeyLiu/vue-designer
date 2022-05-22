<template>
	<div id="blocklyDiv" ref="blocklyDiv"></div>
	<xml ref="blocklyToolbox" style="display: none">
		<slot></slot>
	</xml>
</template>

<script>
import Blockly from "blockly";
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "BlocklyComponent",
	props: ["options"],
	data() {
		return {
			workspace: ref(null),
		};
	},
	mountued() {
		console.log("init blockly");
		try {
			var options = this.$props.options || {};
			if (!options.toolbox) {
				options.toolbox = this.$refs["blocklyToolbox"];
			}
			this.workspace = Blockly.inject(this.$refs["blocklyDiv"], options);
		} catch (e) {
			console.log("init error ", e);
		}
	},
	beforeCreate() {
		console.log("before BlocklyComponent create");
	},
	beforeMount() {
		console.log("beforeMount BlocklyComponent");
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.blocklyDiv {
	height: 100%;
	width: 100%;
	text-align: left;
}
</style>
