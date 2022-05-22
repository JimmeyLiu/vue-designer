// 引入写好的全局组件
import XTabs from "./x-tabs";
const components = [XTabs];

// 默认导出插件
export default {
  install: function (app) {
    components.forEach((component) => {
      component.install(app);
    });
  },
  components,
};
