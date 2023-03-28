# Button组件分析
## Button组件js分析
Button组件需要支持的基本特性：
  颜色type、大小size、形状shape、底色透明ghost、禁用disabled、加载中loading、a标签 href、space， 额外可接收的有className、children

* text - 文本
* type - 按钮类型：主要差异在于颜色  primary、secondary、success、info、warning、danger、**default** string
* size - 支持修改Button组件的大小：large、small、**default** string
* shape - 按钮的形状： circle、round string
* ghost - 透明底色 boolean
* disabled -  按钮的禁用状态 boolean
* loading - 按钮是否处于加载中  boolean， loading状态下的button需要置灰
* href - 表示展示a标签
* space - 若只有两个中文字符，中间是否需要新增空格  boolean
* onClick

具体代码思路分析：
  1、需要在ButtonHelper.ts中定义好可选的string属性： type、size、shape的基本类型以及组件的Props
  2、在组件内部处理外部传入的props，根据不同的属性值 生成classNames
  3、校验当前children传入的是否为两个中文，若为两个中文 则取space属性进行判断
  4、当children属性
  3、使用基础的button，接收相应的button信息

## Button组件 css分析
### 最基础的so-button
### 不同的type
### 透明底色
### disabled处理

