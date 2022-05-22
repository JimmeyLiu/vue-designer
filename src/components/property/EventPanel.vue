<template >
	<a-list size="small" bordered :data-source="eventMetas">
		<template #renderItem="{ item }">
			<a-list-item> {{ item.desc }} <edit-outlined /> </a-list-item>
		</template>
	</a-list>
</template>
<script>
import { defineComponent, ref } from "vue";
//这是antdv Input组件属性配置
const eventMetas = [
	{
		name: "onChange",
		args: ["e"],
		desc: "内容发送变化",
	},
	{
		name: "blur",
		args: ["e"],
		desc: "失去焦点",
	},
];

export default defineComponent({
	components: {},
	// props: ["propertyMetas", "propertyValues"],
	setup() {
		return {
			eventMetas,
			methodRefs: ref({}),
		};
	},
	computed: {},
	methods: {
		valueChange(value) {
			this.methodRefs[value.name] = value.value;
		},
	},
});
</script>
<style scoped>
.ant-form-item {
	margin-bottom: 10px !important;
}
</style>