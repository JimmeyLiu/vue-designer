<template>
	<a-skeleton active v-if="loading" />
	<component :is="page" v-else> </component>
</template>
<script>
// import { getCompiledPage, compilePage } from "@/api";
import { defineComponent, defineAsyncComponent, ref } from "vue";
import * as Vue from "vue";
import * as antIcons from "@ant-design/icons-vue";
import { getComponentCode, getPageCode } from "@/api";
import { postApi, getApi } from "@/api";
const { loadModule } = window["vue3-sfc-loader"];
const pageCode = window.config.pageCode;

const options = {
	moduleCache: {
		vue: Vue,
		"@ant-design/icons-vue": antIcons,
		"@/api": { postApi, getApi },
	},

	getFile(url) {
		if (/^DynamicPage(\d+).vue$/g.test(url)) {
			return Promise.resolve(window.CURRENT_SOURCE);
		}

		let m = url.match("@/components/(.*).vue");
		if (m === null) {
			return Promise.resolve("error");
		}
		return new Promise((resolve) => {
			getComponentCode(m[1]).then((res) => {
				resolve(res.data.data);
			});
		});
	},

	addStyle() {
		/* unused here */
	},
};
export default defineComponent({
	data() {
		return {
			page: ref(null),
			loading: ref(true),
		};
	},
	watch: {
		$route: {
			immediate: true,
			async handler() {
				this.loading = true;
				getPageCode(this.$route.params.pageCode || pageCode).then(
					(res) => {
						if (res.data.success) {
							this.render(res.data.data);
						}
					}
				);
			},
		},
	},
	methods: {
		render(code) {
			window.CURRENT_SOURCE = code;
			let dynamicComponent =
				"DynamicPage" + new Date().getTime() + ".vue";
			this.page = defineAsyncComponent(() =>
				loadModule(dynamicComponent, options)
			);
			this.loading = false;
		},
	},
});
</script>