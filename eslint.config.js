// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: await import("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: globals.browser,
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      prettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prettier/prettier": "warn",
    },
    extends: [configPrettier],
  },
]);
