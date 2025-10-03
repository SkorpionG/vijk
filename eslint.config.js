import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Base recommended configs
  eslint.configs.recommended,

  // TypeScript files with type checking
  {
    files: ["**/*.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },

  // JavaScript files - no type checking
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        module: "writable",
        require: "readonly",
      },
    },
  },

  // Example files - allow console
  {
    files: ["examples/**/*.ts"],
    languageOptions: {
      globals: {
        console: "readonly",
      },
    },
  },

  // Ignore patterns
  {
    ignores: ["dist/", "node_modules/", "coverage/", "*.config.js"],
  }
);
