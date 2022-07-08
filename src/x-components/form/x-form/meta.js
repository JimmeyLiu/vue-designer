import XForm from "./XForm.vue";
import PropertyForm from "./PropertyForm.vue";
export default {
  name: "x-form",
  component: XForm,
  title: "表单容器",
  group: "form",
  panel: {
    propertyForm: PropertyForm,
  },
  //导出的事件
  events: [],
  //导出的方法
  functions: [
    {
      name: "reset",
      title: "重置表单",
      args: [],
    },
    {
      name: "getValue",
      title: "获取表单数据",
      args: [],
      return: "object",
    },
  ],
};
