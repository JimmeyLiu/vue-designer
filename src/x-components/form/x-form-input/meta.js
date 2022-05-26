import XFormInput from "./XFormInput.vue";
import PropertyForm from "./PropertyForm.vue";
export default {
  name: "x-form-input",
  component: XFormInput,
  title: "单行文本",
  group: "form",
  panel: {
    propertyForm: PropertyForm,
  },
};
