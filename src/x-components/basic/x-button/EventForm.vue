<template>
	<div class="event-form">
		<a-dropdown v-if="remains.length > 0">
			<a class="ant-dropdown-link" @click.prevent>
				<plus-outlined />
				订阅事件
			</a>
			<template #overlay>
				<a-menu>
					<template v-for="e in remains" :key="e.name">
						<a-menu-item>
							<a @click="subscribe(e)">{{ e.title }}</a>
						</a-menu-item>
					</template>
				</a-menu>
			</template>
		</a-dropdown>
		<a-list size="small" :dataSource="events" :split="false">
			<template #renderItem="{ item }">
				<a-list-item style="padding: '5px 10px'">
					<a-list-item-meta>
						<template #title>
							<span>
								{{ item.title }}
								<a-tag v-if="item.enabled" color="green">
									已设置
								</a-tag>
								<a-tag v-else color="red">未设置</a-tag>
							</span>
						</template>
						<template #description>调用表单的reset方法</template>
					</a-list-item-meta>
					<template #actions>
						<edit-outlined />
					</template>
				</a-list-item>
			</template>
		</a-list>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
// import lodash from "lodash";
// import { mergeObject } from "@/utils";
const definedEvents = [
	{
		name: "click",
		title: "点击按钮",
	},
	{
		name: "dbclick",
		title: "双击按钮",
	},
];
export default defineComponent({
	components: {},
	props: ["meta"],
	emits: ["eventChange"],
	mounted() {
		this.events = this.meta.events || [];
	},
	watch: {
		meta() {},
		formState: {},
	},
	methods: {
		onChange() {
			console.log("formState change");
			// this.$emit("change", {
			// 	id: this.meta.id,
			// 	properties: this.formState,
			// });
		},
		subscribe(e) {
			this.events.push(e);
		},
	},
	computed: {
		remains() {
			let remains = [];
			let subed = [];
			this.events.forEach((it) => {
				subed.push(it.name);
			});
			definedEvents.forEach((it) => {
				if (!subed.includes(it.name)) {
					remains.push(it);
				}
			});
			return remains;
		},
	},
	setup() {
		return {
			events: ref([]),
			definedEvents,
		};
	},
});
</script>
<style scoped>
.ant-list-item {
	border: 1px solid #eff2f5;
	margin-bottom: 10px;
	padding: 6px 10px !important;
	margin: 10px;
}
.ant-list-split .ant-list-item:last-child {
	border-bottom: 1px solid #eff2f5;
}
.event-form {
	padding: 0 10px;
}
</style>
