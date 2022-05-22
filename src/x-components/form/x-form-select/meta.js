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
    ],
  },
];
import XFormSelect from "./XFormSelect.vue";
export default {
  name: "x-form-select",
  component: XFormSelect,
  title: "下拉框",
  group: "form",
  panel: {
    properties: propertyPanel,
  },
};
