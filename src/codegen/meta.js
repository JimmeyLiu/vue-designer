export const meta = {
  "x-form": {
    component: "x-form",
    name: "表单",
    properties: [
      {
        title: "布局",
        description: "表单布局",
        defaultValue: "horizontal",
        propComponent: "prop-radio",
        properties: {
          options: [
            {
              value: "horizontal",
              lable: "水平布局",
            },
            {
              value: "vertical",
              lable: "垂直布局",
            },
            {
              value: "inline",
              lable: "行内布局",
            },
          ],
        },
      },
    ],
  },
  "x-form-input": {
    component: "x-form-input",
  },
};
