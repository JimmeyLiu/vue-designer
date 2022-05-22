const perpertiesPanel = {
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
import XText from "./XText.vue";
export default {
  name: "x-text",
  component: XText,
  title: "文本内容",
  group: "basic",
  panel: {
    properties: perpertiesPanel,
  },
  init: () => {},
  accept: () => {
    return true;
  },
};
