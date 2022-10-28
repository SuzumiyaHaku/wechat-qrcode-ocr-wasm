module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // "ecmaVersion": "latest",
    // "sourceType": "module"
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "no-undef": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-var": "off",
    "eslint-disable-next-line": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-debugger": "off",
  },
};
