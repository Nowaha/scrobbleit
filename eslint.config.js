import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import solid from "eslint-plugin-solid/configs/typescript";

export default defineConfig(
  { ignores: ["dist"] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { import: importPlugin },
    settings: {
      "import/resolver": { typescript: true },
    },
    rules: {
      "import/extensions": ["error", "always", { ignorePackages: true }],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
  },
);
