<template >
	<component :is="prop.component" />
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
	components: {},
	props: ["prop"],
	setup() {},
});
</script>
