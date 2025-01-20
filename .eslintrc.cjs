// .eslintrc.cjs
/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:react/recommended", // brings in rules from the plugin
    "plugin:react/jsx-runtime", // brings in rules from the plugin
    "plugin:testing-library/react",
  ],
  settings: {
    //tells the plugin to detect the React version that's installed
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
    es2021: true,
  },
  overrides: [
    { files: ["*.cjs"] },
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended", // disables rules from the eslint:recommended confid that are redundant with TypeScript
        "plugin:@typescript-eslint/recommended-requiring-type-checking", // enables rules that "utilize the awesome power of Typescript's typechecking APIs to provide much deeper insights into your code." One useful rule in this set is the no-foating-promises rule, which requires you to handle promises returned by async functions you call (for example, by using the await keyboard). Treating async functions as if they were synchronous is a commom developer mistake, but thanks to the combined power of Typescript and ESLint, you don't have to worry about it!
      ],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
