export const schema = {
  type: "PAGE",
  id: "form1",
  component: "x-form",
  name: "表单",
  children: [
    {
      type: "COMPONENT",
      id: "input1",
      component: "x-form-input",
      properties: {
        readonly: true,
      },
    },
  ],
};
