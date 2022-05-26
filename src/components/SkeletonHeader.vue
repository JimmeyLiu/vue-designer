<template>
	<div class="skeleton-header">
		<div class="left">
			<img width="32" src="@/assets/logo.png" />
		</div>
		<div class="right">
			<a-button class="action-item" @click="preview">预览</a-button>
			<a-button class="action-item" @click="save" type="primary"
				>保存</a-button
			>
		</div>
	</div>
	<a-modal
		:visible="showPreview"
		@cancel="showPreview = false"
		:footer="null"
		width="100%"
		height="100%"
		:centered="true"
		:bodyStyle="{ padding: 0 }"
		:z-index="4000"
		:forceRender="true"
	>
		<iframe
			v-show="loaded"
			id="preview"
			src="/preview.html"
			:onload="onIframeLoad"
			style="
				transform: scale(1);
				height: calc(100vh - 6px);
				width: 100%;
				border: none;
			"
		/>
	</a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: ["components"],
	emits: ["save"],
	setup() {
		return {
			showPreview: ref(false),
			loaded: ref(false),
		};
	},
	methods: {
		save() {
			this.$emit("save");
		},
		preview() {
			this.showPreview = true;
		},
		onIframeLoad() {
			this.loaded = true;
			this.render();
		},

		render() {
			if (this.loaded && this.components) {
				document
					.getElementById("preview")
					.contentWindow.render(this.components);
			}
		},
	},
});
</script>

<style scoped>
.skeleton-header {
	padding: 0 10px;
	display: flex;
	width: 100%;
}
.left {
	width: 50%;
}
.right {
	width: 50%;
	text-align: right;
}
.action-item {
	margin-left: 10px;
}
</style>