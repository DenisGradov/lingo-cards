import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: {
      ecmaVersion: "latest     ", 
      sourceType: "module", 
      globals: {
        ...globals.node, 
      },
    },
    rules: {
      "no-unused-vars": ["warn", { args: "none", varsIgnorePattern: "^_" }],
      "no-undef": "error", 
    },
  },
  pluginJs.configs.recommended, 
];
