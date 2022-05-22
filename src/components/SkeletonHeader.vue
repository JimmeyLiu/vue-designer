<template>
	<div class="skeleton-header">
		<div class="left">
			<img width="32" src="@/assets/logo.png" />
		</div>
		<div class="right">
			<a-button type="primary">保存</a-button>
		</div>
	</div>
</template>
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
</style>