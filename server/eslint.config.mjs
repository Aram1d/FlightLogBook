import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginSortImports from "eslint-plugin-custom-sort-imports";

export default [
  {
    ignores: [
      "**/*.d.ts",
      "**/*.d.mts",
      "vite.config.ts",
      "**/*.generated.ts",
      "**/gqlTypes.ts"
    ]
  },
  ...tseslint.configs.recommended,
  {
    ...pluginJs.configs.recommended,
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.node },
    plugins: {
      "eslint-plugin-custom-sort-imports": pluginSortImports
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "info"] }],
      "no-debugger": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true }
      ],
      "eslint-plugin-custom-sort-imports/sort-imports": [
        "error",
        {
          patterns: [
            "^@tests",
            "^react$",
            "^react-.*",
            "^urql$",
            "^@urql/.*",
            "^@urql-.*",
            "^@mantine/.*(?!.css$)$",
            "^@mantine/.*(?<!.css$)$",
            "^mantine-.*",
            "@tabler/icons-react",
            ".*",
            "^@api$",
            "^@components$",
            "^@components/",
            "^@hooks$",
            "^@lib$"
          ]
        }
      ]
    }
  },
  {}
];
