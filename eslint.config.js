import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  {
    ignores: ["node_modules/**", ".wrangler/**", "test/**"],
    files: ["src/**/*.ts"],

    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },

    rules: {
      "no-console": "off",

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/no-unused-vars": "off",

      "unused-imports/no-unused-imports": "error",

      "simple-import-sort/imports": "error",

      "simple-import-sort/exports": "error",
    },
  },
];
