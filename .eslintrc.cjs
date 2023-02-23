/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    // quotes: [2, "single"],
    // 关闭组件名多单词检查
    "vue/multi-word-component-names": "off",
  },
};
