module.exports = {
  pluginSearchDirs: false,
  plugins: [require.resolve('prettier-plugin-organize-imports'), require.resolve('prettier-plugin-packagejson')],
  // 一行代码的最大行数
  printWidth: 120,
  // tab缩进的空格宽度
  tabWidth: 2,
  proseWrap: 'never',
  // 是否启用单引号
  singleQuote: true,
  // 结尾是否添加分号
  semi: true,
  // 尾逗号: 启用
  trailingComma: 'all',
  // object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
  bracketSpacing: true,
  // 每一个属性单独放置一行
  singleAttributePerLine: true,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
