// 引入写好的全局组件
import XForm from "./x-form/XForm.vue";
import XFormInput from "./x-form/x-form-input";
import XDrawer from "./XDrawer.vue";
import XComponentSlot from "./XComponentSlot.vue";
import XFromInputProps from "./x-form/x-form-input/XFormInput.json";
import XFormSwitch from "./x-form/XFormSwitch.vue";
import XFormSwitchProps from "./x-form/XFormSwitch.json";
import XTabs from "./x-layout/XTabs.vue";
import XTabsJS from "./x-layout/XTabs.js";
import XText from "./x-basic/XText.vue";
import XTextJS from "./x-basic/XText.json";
import XFormSelect from "./x-form/XFormSelect.vue";
import XFormSelectJS from "./x-form/XFormSelect.json";
import XFormRadio from "./x-form/x-form-radio";

const metas = {
  "x-form": XForm,
  "x-form-input": XFromInputProps,
  "x-form-switch": XFormSwitchProps,
  "x-form-select": XFormSelectJS,
  "x-tabs": XTabsJS,
  "x-text": XTextJS,
};
const components = [
  {
    group: "布局",
    components: [
      {
        component: "x-tabs",
        title: "选项卡",
      },
    ],
  },
  {
    group: "基础",
    components: [
      {
        component: "x-text",
        title: "文本内容",
      },
    ],
  },
  {
    group: "表单",
    components: [
      {
        component: "x-form",
        title: "表单容器",
      },
      {
        component: "x-form-input",
        title: "单行文本",
      },
      {
        component: "x-form-switch",
        title: "开关",
      },
      {
        component: "x-form-select",
        title: "下拉选择",
      },
      {
        component: "x-form-radio",
        title: "单选框",
      },
    ],
  },
];
// 默认导出插件
export default {
  install: function (app) {
    let xmetas = {};
    let register = {
      component(name, vue) {
        app.component(name, vue);
      },
      propForm(name, json) {
        xmetas[name] = json;
      },
      group(){
        
      }
    };

    XFormRadio.install(register);
    XFormInput.install(register);
    // 在自定义的插件中注册为全局组件
    app.component("XForm", XForm);
    app.component("XDrawer", XDrawer);
    app.component("XComponentSlot", XComponentSlot);
    app.component("XFormSwitch", XFormSwitch);
    app.component("XTabs", XTabs);
    app.component("XText", XText);
    app.component("XFormSelect", XFormSelect);

    // let o = app.config.globalProperties.$xmetas;
    //统一注册各个组件的元数据
    // app.config.globalProperties.$xmetas = { metas, ...o };
    app.config.globalProperties.$xmetas = { ...metas, ...xmetas };
  },

  components,
};
