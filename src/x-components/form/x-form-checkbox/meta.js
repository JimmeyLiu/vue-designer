import XFormCheckbox from "./XFormCheckbox.vue";
import PropertyForm from "./PropertyForm.vue";

export default {
  name: "x-form-checkbox",
  component: XFormCheckbox,
  title: "多选框",
  group: "form",
  panel: {
    propertyForm: PropertyForm,
  },
};
