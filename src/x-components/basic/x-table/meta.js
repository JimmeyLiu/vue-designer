import XTable from "./XTable.vue";
import PropertyForm from "./PropertyForm.vue";
export default {
  name: "x-table",
  component: XTable,
  title: "表格",
  group: "basic",
  panel: {
    propertyForm: PropertyForm,
  },
};
