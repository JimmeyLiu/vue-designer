import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";
import "../../style/reset.css";
import * as antIcons from "@ant-design/icons-vue";
import xComponents from "@/x-components";
const app = createApp(App);
app.config.productionTip = false;
app.config.compilerOptions.isCustomElement = (tag) => tag === "xml";
Object.keys(antIcons).forEach((key) => {
  app.component(key, antIcons[key]);
});
xComponents.install(app);
app.use(Antd).mount("#app");
