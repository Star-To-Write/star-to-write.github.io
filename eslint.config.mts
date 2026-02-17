import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
export default defineConfig([
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            ".next/**",
            "coverage/**",
            "next-env.d.ts",
        ],
    },

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // suppress errors for missing 'import React' in files
            "react/react-in-jsx-scope": "off",
            // allow jsx syntax in js files (for next.js project)
            "react/jsx-filename-extension": [
                1,
                { extensions: [".js", ".jsx", ".ts", ".tsx"] },
            ], //should add ".ts" if typescript project
            "react/no-unescaped-entities": "off", // SO SORRY!,
            ...nextPlugin.configs.recommended.rules,
        },

        settings: {
            react: {
                version: "detect",
            },
        },
        plugins: {
            "@next/next": nextPlugin,
        },
    },
]);
