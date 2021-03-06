import { createApp } from "vue";
import Antd from "ant-design-vue";
import Preview from "./Preview";
import "ant-design-vue/dist/antd.css";
import "../../style/reset.css";
import * as antIcons from "@ant-design/icons-vue";
import xComponents from "@/x-components";
const app = createApp(Preview);
app.config.productionTip = false;

Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key]);
});
xComponents.install(app);
app.use(Antd).mount("#app");
