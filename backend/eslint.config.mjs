// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'test'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
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
                    "selector": ["variable"],
                    "format": ["camelCase", "UPPER_CASE"],
                    "leadingUnderscore": "allow"
                },
                {
                    "selector": ["class", "interface"],
                    "format": ["PascalCase"]
                },
                {
                    "selector": ["function", "parameter", "classMethod", "classProperty"],
                    "format": ["camelCase"]
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
            "eqeqeq": "error",
            "prefer-const": "warn",
            "no-empty": "error",
            "no-fallthrough": "error",
            
            "max-lines-per-function": ["error", 30],
            "complexity": ["error", { "max": 7 }],
            "max-params": ["error", 6],
            "max-depth": ["error", 4],  //da mettere in pdq
            "max-lines": ["error", 300], //da mettere in pdq
            "max-statements": ["error", 10], //da mettere in pdq
        },
    },
);