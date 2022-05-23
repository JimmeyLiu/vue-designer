module.exports = {
  devServer: {},
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        // options["compilerOptions"] = {
        //   ...(options.compilerOptions || {}),
        //   isCustomElement: (tag) => {
        //     return tag === "xml";
        //   },
        // };
        return options;
      });
  },
  pages: {
    index: {
      template: "public/index.html",
      entry: "src/pages/index/main.js",
      filename: "index.html",
    },
    preview: {
      template: "public/index.html",
      entry: "src/pages/preview/main.js",
      filename: "preview.html",
    },
    simulator: {
      template: "public/index.html",
      entry: "src/pages/simulator/main.js",
      filename: "simulator.html",
    },
  },
};
