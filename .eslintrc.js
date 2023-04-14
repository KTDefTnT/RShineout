module.exports = {
  // 解析器
  parser: '@typescript-eslint/parser',
  // 集成现有的eslint规则集配置
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    // 必须添加在最后位置
    'plugin:prettier/recommended',
  ],
  // eslint的插件集，为eslint配置了一些的rules
  plugins: ['@typescript-eslint'],
  // 解析器参数
  parserOptions: {
    // 指定ESLint可以解析JSX语法
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 规则配置
  rules: {
    // 允许使用any
    '@typescript-eslint/no-explicit-any': 'off',
    // react的function组件不强制使用函数表达式
    'react/function-component-definition': 'off',
    // jsx中props透传
    'react/jsx-props-no-spreading': 'off',
    // 一个文件只有一个导出时，不强制使用export default
    'import/prefer-default-export': 'warn',
    // 不强制需要定义defaultProps
    'react/require-default-props': 'off',
    // 最长行数校验不启用
    'max-len': 'off',
    // 允许在tsx中使用jsx
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    // 关闭prop-types的检测
    'react/prop-types': 'off',
    // 配置导入文件时省略文件扩展名, 在airbnb中已被设置，需要覆盖掉原有设置
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码, 配合eslint-plugin-react
    react: {
      pragma: 'React',
      version: 'detect',
    },
    // 在webpack中进行使用，直接映射到webpack的alias中
    // 'import/resolver': {
    //   /**
    //    * 传入webpack 需要使用到eslint-import-resolver-webpack
    //    * import 插件通知「eslint-import-resolver-」 + 「webpack」找到插件并使用，就能解析webpack
    //    */
    //   alias: {
    //     map: [
    //       ['@src', './src'],
    //     ],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    // },
    // eslint-plugin-import: 配置导入文件时省略文件扩展名
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
};
