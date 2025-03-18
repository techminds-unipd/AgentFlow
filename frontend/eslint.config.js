import js from "@eslint/js";
import eslint from '@eslint/js';
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    { ignores: ["dist", "eslint.config.js"] },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.node,
                ...globals.jest,
                ...globals.browser,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: "./",
                project: "tsconfig.json"
            },
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-unsafe-argument": "warn",
            "@typescript-eslint/default-param-last": "warn",
            "@typescript-eslint/dot-notation": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: ["variable"],
                    format: ["camelCase", "UPPER_CASE"],
                    leadingUnderscore: "allow"
                },
                {
                    selector: ["class", "interface"],
                    format: ["PascalCase"]
                },
                {
                    selector: ["function", "parameter", "classMethod", "classProperty"],
                    format: ["camelCase"]
                }
            ],
            "@typescript-eslint/no-deprecated": "warn",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/prefer-readonly": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/require-await": "error",
            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/strict-boolean-expressions": "error",
            "@typescript-eslint/unified-signatures": "error",
            "no-console": "warn",
            "no-duplicate-case": "error",
            eqeqeq: "error",
            "prefer-const": "warn",
            "no-empty": "error",
            "no-fallthrough": "error",
            curly: ["warn", "multi-or-nest"],
            // Queste sono quelle definite in pdq
            "max-lines-per-function": ["error", 30],
            complexity: ["error", { max: 7 }],
            "max-params": ["error", 6],
            "max-depth": ["error", 4],
            "max-lines": ["error", 300],
            "max-statements": ["error", 8]
        }
    }
);
