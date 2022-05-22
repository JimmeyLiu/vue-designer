<template>
	<div
		class="x-component x-form-upload"
		:id="meta.id"
		data-component="x-form-upload"
	>
		<div v-if="mode === 'design'" class="x-component-mask"></div>
		<a-form-item :label="label" :colon="colon">
			<a-upload
				v-model:file-list="value"
				name="file"
				action="/upload"
				@change="handleChange"
				:withCredentials="true"
			>
				<a-button>
					<upload-outlined></upload-outlined>
					Click to Upload
				</a-button>
			</a-upload>
		</a-form-item>
	</div>
</template>
<script>
import { defineComponent, ref } from "vue";
import formMixin from "../mixin";
export default defineComponent({
	mixins: [formMixin],
	name: "XFormUpload",
	setup() {
		return {
			value: ref([]),
		};
	},
	methods: {
		handleChange() {},
	},
});
</script>