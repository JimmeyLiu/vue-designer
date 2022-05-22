<template>
	<div id="container" class="designer-simulator-container">
		<iframe
			id="preview"
			ref="preview"
			src="/preview.html"
			style="
				transform: scale(1);
				height: calc(100vh - 140px);
				width: 100%;
				border: none;
			"
		/>
	</div>
	<div id="actions" class="target-actions">
		<a-button size="small" @click="copyElement">
			<template #icon><copy-outlined /></template>
		</a-button>
		<a-button size="small" @click="deleteElement">
			<template #icon><delete-outlined /></template>
		</a-button>
	</div>
</template>
<script >
import { defineComponent } from "vue";
import $ from "jquery";
import "jquery-ui/ui/widgets/droppable";

import { createUniqueId } from "../utils";
// import PageRender from "./render/PageRender.vue";
window.dragging = false;
export default defineComponent({
	setup() {},
	mounted() {
		$("#container div.dnd-target").each(function () {
			$(this).attr("id", createUniqueId());
		});
		let actionWidth = $("#actions").width();
		let actionHeight = $("#actions").height();
		$("#container div.dnd-target").mouseenter(function () {
			if (!window.dragging) {
				this.classList.add("hover");
				$(this).parents("div.dnd-target").removeClass("hover");
			}
		});
		$("#container div.dnd-target").mouseleave(function () {
			this.classList.remove("hover");
		});
		$("#container div.dnd-target").click(function (e) {
			$("#container div.dnd-target").removeClass("choosed");
			this.classList.add("choosed");
			let client = this.getBoundingClientRect();
			$("#actions").css({
				top: client.top - actionHeight - 5,
				left: client.right - actionWidth,
			});
			$("#actions").attr("target-id", $(this).attr("id"));
			e.stopPropagation();
		});
		this.handleDrop();
		window.addEventListener("message", this.ha);
	},
	methods: {
		renderIframe() {
			this.$refs.preview.contentWindow.render("范德萨范德萨");
		},
		handleIfromMessage(event) {
			console.log("监听到子页面的传参");
			console.log(event.data);
		},
		deleteElement() {
			let id = $("#actions").attr("target-id");
			if (!id) {
				return;
			}
			$("#" + id).remove();
			$("#actions").css({
				top: -100,
				left: -100,
			});
		},
		copyElement() {
			let id = $("#actions").attr("target-id");
			if (!id) {
				return;
			}
			let source = $("#" + id);
			let cloned = source.clone();
			$(cloned).attr("id", createUniqueId()).removeClass("choosed");
			$(cloned)
				.children("div.dnd-target")
				.each(function () {
					$(this).attr("id", createUniqueId());
				});
			cloned.insertAfter(source);
		},
		handleDrop() {
			$("#container .dnd-droppable").droppable({
				over: function (event, ui) {
					// let div = document.elementFromPoint(
					// 	ui.position.left,
					// 	ui.position.top - 10
					// );
					// console.log(div);
					console.log(ui);
				},
				drop: function (event, ui) {
					// let div = document.elementFromPoint(
					// 	ui.position.left,
					// 	ui.position.top - 10
					// );
					// console.log(div);
					let id = $(ui.helper).attr("x-component");
					let copy = $("#" + id).clone();
					copy.attr("id", createUniqueId());
					$(this).append(copy.children());
				},
			});
		},
	},
	components: {},
});
</script>

<style scoped>
div {
	border: 1px solid transparent;
}
.hover {
	border: 1px dashed rgb(40, 173, 226);
}
.choosed {
	border: 1px solid rgb(40, 173, 226);
}
.target-actions {
	position: fixed;
	top: -100px;
	left: -100px;
}
/* div:hover {
	border: 1px dashed rgb(40, 173, 226);
} */
</style>
