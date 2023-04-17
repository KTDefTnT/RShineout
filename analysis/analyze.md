# 全局分析
```js
.
├── LICENSE 
├── README.md 
├── analysis  // 各组件解析文件
│   ├── Button  // Button组件
│   │   ├── Button.png
│   │   └── analyze.md
│   ├── analyze.md // 全局解析
│   └── 组件库.xmind // 组件xmind文件
├── docs
│   ├── guide.md
│   └── index.md
├── package-lock.json
├── package.json
├── rules.js
├── src // 组件项目地址
│   ├── Button  // button组件
│   │   ├── Button.tsx // button组件实现
│   │   ├── ButtonGroup.tsx // buttonGroup组件实现
│   │   ├── ButtonHelpers.tsx // button相关ts定义
│   │   ├── index.md // 组件文档
│   │   ├── index.tsx // 组件根文件
│   │   └── styles // 组件样式
│   │       ├── button.less // 组件样式实现
│   │       └── index.tsx // 导出组件的样式，使用generate定义module
│   ├── config.ts // 默认配置相关
│   ├── index.ts // 导出所有组件
│   ├── styles // 全局样式
│   │   ├── base // 全局基础样式
│   │   │   ├── base.less
│   │   │   ├── bootstrap.less
│   │   │   ├── cssvar.less
│   │   │   ├── default.less
│   │   │   └── vars-inject.less
│   │   ├── mixins // 各组件中，可提取为函数、或可共用的函数形式样式集合
│   │   │   ├── border-radius.less
│   │   │   ├── buttons.less
│   │   │   └── vendor-prefixes.less
│   │   ├── normalize.less // 全局基础样式
│   │   ├── themes // 各不同的主题
│   │   │   └── default.less
│   │   └── variables.less // 导入mixins中的文件
│   └── utils // 公共相关的工具类
│       ├── classname.ts // classname组合
│       └── element.tsx // 对元素操作的相关方法
├── tsconfig.json // ts的配置文件
└── typing.config.ts // ts扩展文件信息，新增对模块的定义
```