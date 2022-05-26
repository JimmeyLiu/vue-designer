<template>
	<a-form-item label="启用分页">
		<a-switch v-model:checked="form.enabled" />
	</a-form-item>
	<template v-if="form.enabled">
		<a-form-item label="每页大小">
			<a-input-number v-model:value="form.pageSize" />
		</a-form-item>
		<a-form-item label="显示位置">
			<a-radio-group v-model:value="form.pagePosition">
				<a-radio-button value="top">顶部</a-radio-button>
				<a-radio-button value="bottom">底部</a-radio-button>
				<a-radio-button value="both">顶部和底部</a-radio-button>
			</a-radio-group>
		</a-form-item>
	</template>
</template>
<script>
import { defineComponent, ref } from "vue";
import lodash from "lodash";
import mixin from "../../mixin";
const defaultValues = {
	enabled: true,
	pageSize: 10,
};
export default defineComponent({
	components: {},
	props: ["pagination"],
	mixins: [mixin],
	mounted() {
		this.initValues();
	},
	watch: {
		form: {
			deep: true,
			handler() {
				this.$emit("update:pagination", this.form);
			},
		},
	},
	methods: {
		initValues() {
			let v = lodash.cloneDeep(this.pagination) || {};
			this.form = this.mergeObject(v, defaultValues);
		},
	},

	setup() {
		return {
			form: ref({}),
		};
	},
});
</script>