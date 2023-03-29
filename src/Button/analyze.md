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
  4、当children属性为一个icon时，需要兼容loading情况，loading下 icon需要隐藏
  5、使用基础的button，接收相应的button信息

## Button组件 css分析
### 最基础的so-button

### 不同的type
不同type下主要的差异：文本颜色、背景颜色、边框颜色、hover/active/focus等的状态、点击时的动画效果。
当前使用的css为预处理语言less， 其支持函数式的处理，对应js中的思想，可将当前各type的公共方式进行提取，
公共方法放置于`style/mixin/buttons.less`下。不同类型调用该函数后 传入三个颜色为入参即可进行统一处理 

### 文字按钮
文字按钮统一样式，无背景色 无边框，但需要兼容到type 显示不同的颜色。在text下对type进行二次定义

### 透明底色
透明底色的颜色基础为不同的type，与type类型的差异在于 其背景颜色为透明、边框颜色以type类型颜色、字体颜色也为type类型颜色。同type处理 提取公共方法至`style/mixin/buttons.less`文件下

### disabled处理
disabled状态下的按钮，不管是ghost的还是type的 都是一致性处理
### size的处理


