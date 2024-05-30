import babelParser from "@babel/eslint-parser";
import vueParser from "vue-eslint-parser";
import vuePlugin from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.vue"],
    ignores: ["vite.config.js", "main.js", "eslint.config.js"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
      },
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...vuePlugin.configs.recommended.rules,
      semi: ["warn", "always"],
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    ignores: ["vite.config.js", "main.js", "eslint.config.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        requireConfigFile: false,
      },
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/export": "error",
      "prettier/prettier": "error",
      semi: ["warn", "always"],
    },
  },
];
