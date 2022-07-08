# 组件

一个组件由以下几个文件组成

1. index.js ：组件入口文件，注册组件
2. meta.js：组件元数据定义，格式如下（以 x-form-input 为例）
```
export default {
  name: "x-form-input", //组件名称，会全局注册到Vue中去
  component: XFormInput, //组件运行时代码，里面根据mode = design|preview|production 三种状态分别做不同处理
  title: "单行文本", //组件标题，在左侧组件栏显示
  group: "form", //组件分组
  panel: { //组件相关设置面板
    propertyForm: PropertyForm, //属性设置表单
    eventForm: EventForm, //事件设置表单
  },
  export: { // 对外导出暴露信息
    events: [ //导出的事件
      {
        name: "click", //点击事件
        args: ["e"], //点击事情的参数
      },
    ],
    methods: [ //导出的方法
      {
        name: "getValue", //方法名称
        args: [], //参数列表
      },
    ],
  },
};
```
3. PropertyForm.vue：属性设置表单，渲染在右侧面板上
4. XFormInput.vue：设计、预览、生产环境实际执行的代码