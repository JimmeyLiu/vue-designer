// 引入写好的全局组件
import XForm from "./x-form";
import XFormInput from "./x-form-input";
import XFormInputNumber from "./x-form-input-number";
// import XFormTextarea from "./x-form-textarea";
import XFormRichtext from "./x-form-richtext";
import XFormSelect from "./x-form-select";
import XFormSwitch from "./x-form-switch";
import XFormTags from "./x-form-tags";
import XFormRadio from "./x-form-radio";
import XFormCheckbox from "./x-form-checkbox";
import XFormDatePicker from "./x-form-datepicker";
import XFormDateRange from "./x-form-daterange";
import XFormRate from "./x-form-rate";
import XFormUpload from "./x-form-upload";

const components = [
  XForm,
  XFormInput,
  XFormInputNumber,
  XFormSelect,
  XFormSwitch,
  XFormTags,
  XFormRadio,
  XFormCheckbox,
  XFormRichtext,
  XFormDatePicker,
  XFormDateRange,
  XFormRate,
  XFormUpload,
];

// 默认导出插件
export default {
  install: function (app) {
    components.forEach((component) => {
      component.install(app);
    });
  },
  components,
};
