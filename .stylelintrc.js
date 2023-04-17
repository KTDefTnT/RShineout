// 不使用：当前的校验不符合当前库的要求
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-recommended-less'],
  plugin: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|ts|html)'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.(html|tsx)'],
      customSyntax: 'postcss-html',
    },
  ],
  // 忽略校验的文件
  ignoreFiles: ['**/*.json', '**/*.md', '**/*.yaml'],
  // 校验规则
  rules: {
    // 导入方式为@import '**/*.(less|css)'
    'import-notation': 'string',
    // 允许有重复的选择器
    'no-duplicate-selectors': null,
    // 最长的小数点位数
    'number-max-precision': 10,
    'selector-anb-no-unmatchable': null,
    'less/color-no-invalid-hex': null,
    'less/no-duplicate-variables': null,
    // 伪元素选择器 - 直接使用伪类一个冒号
    'selector-pseudo-element-colon-notation': 'single',
    // keyframes的名称
    'keyframes-name-pattern': '.*',
    // 这些可以不缩写
    'declaration-block-no-redundant-longhand-properties': ['/border/'],
    // 预期not的
    'selector-not-notation': 'complex',
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    // 指定样式的排序
    // 'order/properties-order': [
    //   'position',
    //   'top',
    //   'right',
    //   'bottom',
    //   'left',
    //   'z-index',
    //   'display',
    //   'justify-content',
    //   'align-items',
    //   'float',
    //   'clear',
    //   'margin',
    //   'margin-top',
    //   'margin-right',
    //   'margin-bottom',
    //   'margin-left',
    //   'padding',
    //   'padding-top',
    //   'padding-right',
    //   'padding-bottom',
    //   'padding-left',
    //   'width',
    //   'max-width',
    //   'min-width',
    //   'height',
    //   'max-height',
    //   'min-height',
    //   'line-height',
    //   'font-size',
    //   'font-family',
    //   'text-align',
    //   'text-justify',
    //   'text-indent',
    //   'text-overflow',
    //   'text-decoration',
    //   'white-space',
    //   'color',
    //   'background',
    //   'background-position',
    //   'background-repeat',
    //   'background-size',
    //   'background-color',
    //   'background-clip',
    //   'border',
    //   'border-style',
    //   'border-width',
    //   'border-color',
    //   'border-top-style',
    //   'border-top-width',
    //   'border-top-color',
    //   'border-right-style',
    //   'border-right-width',
    //   'border-right-color',
    //   'border-bottom-style',
    //   'border-bottom-width',
    //   'border-bottom-color',
    //   'border-left-style',
    //   'border-left-width',
    //   'border-left-color',
    //   'border-radius',
    //   'opacity',
    //   'filter',
    //   'list-style',
    //   'outline',
    //   'visibility',
    //   'box-shadow',
    //   'text-shadow',
    //   'resize',
    //   'overflow',
    //   'overflow-x',
    //   'overflow-y',
    //   'transition'
    // ]
  },
};
