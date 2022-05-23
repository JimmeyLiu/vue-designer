const perpertyPanel = {
  form: {
    id: "form",
    component: "x-form",
    properties: {
      labelAlign: "left",
    },
    children: [
      {
        id: "label",
        component: "x-form-input",
        properties: {
          label: "标题",
          colon: false,
        },
        defaultValue: "单行文本",
      },
      {
        id: "labelColon",
        component: "x-form-switch",
        properties: {
          label: "标题冒号",
          colon: false,
        },
        defaultValue: true,
      },
      {
        id: "labelAlign",
        component: "x-form-radio",
        properties: {
          label: "对齐方式",
          colon: false,
          options: ["left", "right"],
        },
        defaultValue: "left",
      },
      {
        id: "defaultValue",
        component: "x-form-input",
        defaultValue: "这是默认值",
        properties: {
          label: "默认值",
          colon: false,
        },
      },
      {
        id: "description",
        component: "x-form-input",
        properties: {
          label: "描述",
          colon: false,
        },
      },
      {
        id: "disabled",
        component: "x-form-switch",
        properties: {
          label: "是否禁用",
          colon: false,
        },
      },
    ],
  },
};
import XFormInput from "./XFormInput.vue";
export default {
  name: "x-form-input",
  component: XFormInput,
  title: "单行文本",
  group: "form",
  panel: {
    property: perpertyPanel,
  },
};
