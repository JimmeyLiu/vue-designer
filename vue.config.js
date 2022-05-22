module.exports = {
  devServer: {},
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options["compilerOptions"] = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => {
            return tag === "xml";
          },
        };
        return options;
      });
  },
  pages: {
    mod1: {
      template: "public/index.html",
      entry: "src/pages/index/main.js",
      filename: "index.html",
    },
    mod2: {
      template: "public/index.html",
      entry: "src/pages/preview/main.js",
      filename: "preview.html",
    },
  },
};
