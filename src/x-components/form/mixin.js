export default {
  props: ["meta", "data", "mode"],
  mounted() {
    this.value = this.defaultValue;
  },
  computed: {
    label() {
      return (
        (this.data && this.data[this.meta.id]) || this.meta.value || "标题"
      );
    },
    colon() {
      let v = this.meta.properties?.colon;
      return v === undefined ? true : v;
    },
    defaultValue() {
      return this.meta.defaultValue || "";
    },
  },
  methods: {
    onChange() {},
  },
};
