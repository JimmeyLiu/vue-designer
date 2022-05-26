import XFormDatePicker from "./XFormDatePicker.vue";
import PropertyForm from "./PropertyForm.vue";
export default {
  name: "x-form-datepicker",
  component: XFormDatePicker,
  title: "日期",
  group: "form",
  panel: {
    propertyForm: PropertyForm,
  },
};
