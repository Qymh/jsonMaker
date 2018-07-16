module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    'vue'
  ],
  rules: {
    // 不写冒号
    "semi": [2, "never"],
    // 可以输入console
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["error", { "semi": false ,"singleQuote": true}],
    // 不解析html
    "vue/no-parsing-error":0,
    // 使用单引号
    "quotes":[2,"single"]
  }
}
