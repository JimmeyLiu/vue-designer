export const propertyMixin = {
  props: ["propMeta", "propValues"],
  emits: ["valueChange"],

  mounted() {
    console.log(this.propValues, this.propMeta.name);
    this.value =
      this.propValues[this.propMeta.name] || this.propMeta.defaultValue || "";
    console.log("mounted value ", this.value);
  },
  watch: {
    propValues() {
      console.log("watch propValues", this.propValues);
      this.value =
        this.propValues[this.propMeta.name] || this.propMeta.defaultValue || "";
      console.log("watch propValues value", this.value);
    },
  },
  computed: {
    /**
     * 关联依赖显示
     */
    dependOn() {
      return !(
        this.propMeta.dependOn &&
        this.propValue &&
        this.propValue[this.propMeta.dependOn]
      );
    },
  },
  methods: {
    onValueChange() {
      this.$emit("valueChange", {
        name: this.propMeta.name,
        value: this.value,
      });
    },
  },
};
