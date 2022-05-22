import PropForm from "./PropForm.json";
import XFormRadio from "./XFormRadio.vue";
const name = "x-form-radio";

export default {
  install: function (register) {
    register.component(name, XFormRadio);
    register.propForm(name, PropForm);
  },
};
