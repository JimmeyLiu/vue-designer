// 引入写好的全局组件
import form from "./form";
import layout from "./layout";
import basic from "./basic";

import XComponentSlot from "./XComponentSlot.vue";
const components = [];
const types = [basic, layout, form];
// 默认导出插件
export default {
  install: function (app) {
    types.forEach((t) => {
      t.install(app);
    });
    let metas = app.config.globalProperties.$xmetas || {};
    let map = {};
    Object.keys(metas).forEach((c) => {
      let meta = metas[c];
      let list = map[meta.group] || [];
      list.push({
        component: meta.name,
        title: meta.title,
      });
      map[meta.group] = list;
    });
    console.log("install", map);

    Object.keys(map).forEach((key) => {
      components.push({
        group: key,
        components: map[key],
      });
    });

    app.component("XComponentSlot", XComponentSlot);
  },
  components,
};
