export default (app, meta) => {
  app.component(meta.name, meta.component);
  let metas = app.config.globalProperties.$xmetas || {};
  metas[meta.name] = meta;
  app.config.globalProperties.$xmetas = metas;
};
