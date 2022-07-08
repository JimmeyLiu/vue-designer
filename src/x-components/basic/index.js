// 引入写好的全局组件
import XTable from "./x-table";
import XText from "./x-text";
import XButton from "./x-button";

const components = [XTable, XText, XButton];

// 默认导出插件
export default {
  install: function (app) {
    components.forEach((component) => {
      component.install(app);
    });
  },
  components,
};
