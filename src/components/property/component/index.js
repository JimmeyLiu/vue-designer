// 引入写好的全局组件
import Input from "./Input.vue";
import InputNumber from "./InputNumber.vue";
import Select from "./Select.vue";
import Switch from "./Switch.vue";
import Radio from "./Radio.vue";

// 默认导出插件
export default {
  install: function (app) {
    console.log("install components");
    // 在自定义的插件中注册为全局组件
    app.component("prop-input", Input);
    app.component("prop-select", Select);
    app.component("prop-switch", Switch);
    app.component("prop-radio", Radio);
    app.component("prop-input-number", InputNumber);
  },
};
