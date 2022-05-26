export default {
  methods: {
    getBooleanValue(value, defaultValue) {
      return value === undefined ? defaultValue : value;
    },
    mergeObject(target, source) {
      Object.keys(source).forEach((key) => {
        if (target[key] === undefined) {
          target[key] = source[key];
        }
      });
      return target;
    },
  },
};
