import { createUniqueId } from "@/utils";
const PorpForm = [];
const accept = {
  pattern: "*",
  whitelist: [],
  blacklist: [],
};
const init = () => {
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
};

export default {
  PorpForm,
  init,
  accept,
};
