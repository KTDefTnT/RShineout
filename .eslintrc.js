module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    ecmaFeatures: { // 添加ES特性支持，使之能够识别ES6语法
      "jsx": true
    },
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  },
  // extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    "no-plusplus": "off",
    "react/jsx-max-props-per-line": "off",
    "import/no-mutable-exports": "off",
    "react/prefer-stateless-function" : "off",
    "no-param-reassign": "off",
    "react/require-default-props": "off",
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "max-len":"off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "react/destructuring-assignment": "off",
    "default-param-last": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-props-no-spreading": "off",
    "consistent-return": "off",
  },
}
