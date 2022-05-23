import XDiv from "./XDiv.vue";
export default {
  name: "x-div",
  component: XDiv,
  title: "容器",
  //在左侧组件分组
  group: "layout",
  //设置面板内容
  panel: {
    perperty: [],
    events: [],
    styles: [],
  },
  //初始化的时候调用的方法
};
