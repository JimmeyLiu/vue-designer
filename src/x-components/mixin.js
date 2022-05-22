export const xmixin = {
  props: ["meta", "data", "mode"],
  mounted() {
    this.value =  this.meta.defaultValue || "";
  },
  computed: {
    label() {
      return (
        (this.data && this.data[this.meta.id]) ||
        this.meta.properties?.label ||
        "标题"
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
};
