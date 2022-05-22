import { createUniqueId } from "@/utils";
import XTabs from "./XTabs.vue";
export default {
  name: "x-tabs",
  component: XTabs,
  title: "选项卡",
  //在左侧组件分组
  group: "layout",
  //设置面板内容
  panel: {
    perperties: [],
    events: [],
    styles: [],
  },
  //初始化的时候调用的方法
  init: () => {
    return {
      id: createUniqueId(),
      component: "x-tabs",
      children: [
        {
          id: createUniqueId(),
          tab: "标签项1",
          component: "x-tab-pane",
          children: [],
        },
        {
          id: createUniqueId(),
          tab: "标签项2",
          component: "x-tab-pane",
          children: [],
        },
      ],
    };
  },
  //添加组件的时候
  accept: (component) => {
    //除了不能加自己外，其他组件都可以添加
    return "x-tabs" !== component;
  },
};
