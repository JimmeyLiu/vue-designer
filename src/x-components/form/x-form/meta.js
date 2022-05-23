const perpertiesPanel = [
  {
    id: "form",
    component: "x-form",
    properties: {
      labelAlign: "left",
    },
    children: [
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
        id: "labelSpan",
        component: "x-form-input-number",
        properties: {
          label: "标签宽",
          colon: false,
        },
        defaultValue: 6,
      },
      {
        id: "wrapperSpan",
        component: "x-form-input-number",
        properties: {
          label: "内容宽",
          colon: false,
        },
        defaultValue: 18,
      },
    ],
  },
];
import XForm from "./XForm.vue";
export default {
  name: "x-form",
  component: XForm,
  title: "表单容器",
  group: "form",
  panel: {
    property: perpertiesPanel,
  },
};
