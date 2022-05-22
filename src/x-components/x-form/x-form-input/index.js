import PropForm from "./PropForm.json";
import XFormInput from "./XFormInput.vue";
const name = "x-form-input";
export default {
  install: function (register) {
    register.component(name, XFormInput);
    register.propForm(name, PropForm);
  },
};
