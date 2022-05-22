const propertyPanel = [
  {
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
      {
        id: "open",
        component: "x-form-input",
        properties: {
          label: "打开显示",
          colon: false,
        },
      },
      {
        id: "close",
        component: "x-form-input",
        properties: {
          label: "关闭显示",
          colon: false,
        },
      },
    ],
  },
];
import XFormSwitch from "./XFormSwitch.vue";
export default {
  name: "x-form-switch",
  component: XFormSwitch,
  title: "开关",
  group: "form",
  panel: {
    property: propertyPanel,
  },
};
