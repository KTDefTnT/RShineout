---
theme: channing-cyan
---
# Button组件分析
# Button组件
**当前为缩减版，并不实现a标签的button**

## API实现分析

Button组件需要支持的基本特性：
  颜色type、大小size、形状shape、底色透明ghost、禁用disabled、加载中loading、space， 额外可接收的有className、children

| 属性     | 说明                                 | 类型                           | 默认值                                                       |
| -------- | ------------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| className | 类名                                 | String                         | -                                                            |
| type     | 设置按钮类型                         | String                         | primary \| success \| info \| warning \| danger\| **default** |
| ghost    | 幽灵属性，使按钮背景透明             | boolean                       | false |
| text     | 是否文本展示                         | boolean                        | false                                                        |
| size     | 设置按钮大小                         | `large`  \| `small`   | -          | 
| shape    | 设置按钮形状                         | `default` \| `circle` | -     |
| disabled | 设置按钮失效状态                     | boolean                        | false                                                        |
| loading  | 设置按钮载入状态                     | boolean                        | false                                                        |
| space    | 两个纯中文的子元素，是否需要添加空格 | Boolean                        | false                                                        |
| onClick  | 点击按钮时的回调                     | (event: MouseEvent) => void    | -                                                            |

## 类型定义
以上为一些需要支持的基本属性，在组件的实现过程中需要对各属性进行一个处理。组件最开始需要进行ts的类型定义
```ts
/* ButtonHelper.ts - 定义API中的可选常量值 */
// ~ as const的使用 - 将当前创建的元素定义为常量 - 代表仅支持当前三个，不允许扩充
// 按钮的尺寸
const ButtonSizes = ['large', 'small'] as const;
export type ButtonSize = (typeof ButtonSizes)[number];

// 按钮的类型
const ButtonTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'] as const;
export type ButtonType = (typeof ButtonTypes)[number];

// 按钮的形状
const ButtonShapes = ['circle', 'round'] as const;
export type ButtonShape = (typeof ButtonShapes)[number];

/* Button.tsx - 组件实现 */
// 定义组件的类型，其中对于可选值需要使用?: 进行处理
export type ButtonProps = {
  className?: string;
  type?: ButtonType;
  ghost?: boolean;
  text?: boolean;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  space?: boolean;
  children: React.ReactElement; // 必填
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

```

## 组件实现
### 组件的基本定义
   一个组件的基本属性有: `props`和`ref`, 在ts中可以通过 `React.forwardRef()`进行ref转发，在当前组件中需要将 html元素`button`转发给父级组件。  
   
   [官方文档: forwardRef](https://zh-hans.reactjs.org/reference/react/forwardRef)
```ts
/* Button.tsx */
/* 
 * React.ForwardRefRenderFunction是React中的一种函数类型，用于定义具有转发引用（Forward Ref）功能的组件
 * 解析：T 表示被转发的引用的类型，通常是子组件的类型； P表示组件的props类型
 * 作用：用于定义一个接受props和ref作为参数，具有转发引用（Forward Ref）功能的组件渲染函数
 */
const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { children } = props;
  const buttonRef = (ref as any) || React.createRef<HTMLButtonElement>();

  return (
    <button
      type="button"
      ref={buttonRef}
    >
      {children}
    </button>
  );
};

/**
 * 具体实现
 * function forwardRef<T, P = {}>(
 *   render：ForwardRefRenderFunction<T, P>
 * ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
 * 解析：接收一个render函数，render函数接收`props`和`来自父组件的ref`。 
 * 作用： 将子元素的ref转发给父元素
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(InternalButton);

export default Button;
```

使用当前创建的Button后，实现效果如下：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f7bbe76fd5c4425aef455dd7a766e82~tplv-k3u1fbpfcp-watermark.image?)

### InternalButton的具体实现
* 处理样式属性  
   样式属性包括了: `className、type、text、ghost、size、shape`。样式属性的统一处理是获取到样式表包含了当前模块的处理函数，将其统一处理成className后将其添加到**button**的**className属性**上。
   
   其中的buttonClass为一个带有button模块的样式处理函数，在整体组件库基础函数中说明
```ts
/*  Button.tsx  */
import classnames from 'classnames';
import React from 'react';
import { ButtonShape, ButtonSize, ButtonType } from './ButtonHelpers';
import buttonClass from './styles/index';

const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { children, className, type = 'default', ghost: ghostProp = false, text = false, size, shape } = props;

  // 需要对ghost进行处理: 在设置了text纯文本的情况下，不需要设置为ghost的样式
  const ghost = ghostProp && !text;
  const classNames = classnames(
    buttonClass('_', type, ghost && 'ghost', shape, {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
    }),
    className,
  );
  const buttonRef = (ref as any) || React.createRef<HTMLButtonElement>();

  return (
    <button
      className={classNames}
      type="button"
      ref={buttonRef}
    >
      {children}
    </button>
  );
};

```

* 处理交互属性  
   交互属性：`disabled、loading、onClick`。对以上交互的属性来说，`disabled`对以上的样式属性都有一定的影响，
   * `disabled`属性不仅需要作用于button的交互，也同时影响了button的展示。
   * `loading`属性在将button禁用的同时，需要实现一个loading效果, 在当前实现版本中，并没有使用loading  Icon组件去实现(后期优化~)
   

   以下是继续对**InternalButton**的扩展
   
```ts
/* Button.tsx  */
const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const {
    children,
    className,
    type = 'default',
    ghost: ghostProp = false,
    text = false,
    size,
    shape,
    disabled = false,
    loading = false,
    // onClick作用
    ...others
  } = props;

  // 需要对ghost进行处理: 在设置了text纯文本的情况下，不需要设置为ghost的样式
  const ghost = ghostProp && !text;
  const classNames = classnames(
    buttonClass('_', shape, type, ghost && 'ghost', {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
      disabled, // 增加disabled
    }),
    className,
  );
  const buttonRef = (ref as any) || React.createRef<HTMLButtonElement>();

  return (
    <button
      {...others}
      className={classNames}
      type="button"
      // 在disabled或loading为true的情况下，按钮都应置灰
      disabled={disabled || loading}
      ref={buttonRef}
    >
      {/* 正常来说 loading效果下应展示一个loading组件 */}
      {children}
    </button>
  );
};
```

* 其他属性  
   其他属性： `space`, 当前属性仅在`children`为两个中文时需要处理。则需要存在一个函数去校验当前的`children`。
```ts
/* utils/element.tsx */
export const wrapSpan = (children: React.ReactElement, space: boolean) => {
  const SPACE = ' ';
  const isTwoCNChar = (str: string) => /^[\u4e00-\u9fa5]{2}$/.test(str);
  if (!children) return children;

  if (typeof children === 'string') {
    // 检测为两个中文字符 且需要插入空格
    if (isTwoCNChar(children) && space) return <span>{(children as string).split('').join(SPACE)}</span>;

    // 非两个中文的string类型
    return <span>{children}</span>;
  }

  // 正常React Element直接进行返回
  return children;
};

/* Button.tsx */
const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const {
    className,
    type = 'default',
    ghost: ghostProp = false,
    text = false,
    size,
    shape,
    disabled = false,
    loading = false,
    space = false,
    // onClick作用
    ...others
  } = props;

// 处理children的情况 1. 两个中文名  2、字符串使用span包裹  3、loading且为icon 4、children为空
  const getChildren = () => {
    const { children } = props;
    if (!children) return children;
    const parsed = React.Children.map(wrapSpan(children, space), (item) => {
      // 为loading 状态，且为icon时  返回null
      // todo 需要配置一个Icon组件，并为其设置指定的Type用于判断
      if (loading && isValidElement(item) && item?.type) return null;

      return item;
    }).filter((v: React.ReactElement) => v !== null);

    return parsed;
  };
  // 需要对ghost进行处理: 在设置了text纯文本的情况下，不需要设置为ghost的样式
  const ghost = ghostProp && !text;
  const classNames = classnames(
    buttonClass('_', shape, type, ghost && 'ghost', {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
      disabled, // 增加disabled
    }),
    className,
  );
  const buttonRef = (ref as any) || React.createRef<HTMLButtonElement>();

  const children = getChildren();
  return (
    <button
      {...others}
      className={classNames}
      type="button"
      // 在disabled或loading为true的情况下，按钮都应置灰
      disabled={disabled || loading}
      ref={buttonRef}
    >
      {/* 正常来说 loading效果下应展示一个loading组件 */}
      {children}
    </button>
  );
};
```


## css分析
以下为对各组件的公共处理方式，每个模块在**styles**文件下定义一个 `index.tsx`,用于统一处理组件内的属性、className。
```tsx
/* utils/classnames.tsx */
type styleProps = {
  [key: string]: string;
};

/**
 * 一个高阶函数，返回一个generate function, 新增namespace， 处理css module
 * @param style - object, 当前模块的 css module - eg: button模块对应的样式集合
 * @param module - string 当前所属模块，用于添加模块名
 * @param prefix - string, 默认为 shineout,用于css前缀
 * config.prefix 为自定义的前缀 so
 */
export default (style: styleProps, module: string, prefix: string = config.prefix) =>
  (...args: any[]) => {
    // 组合所有传入的参数
    const className = classnames(...args);
    if (!className) return ''; // 没有任何参数的情况下 直接返回 空字符串

    // 前缀 + 模块的组合
    const ns = `${prefix}${module ? `-${module}` : '-'}`;

    // 整合class，若为_ 则直接使用模块级别的变量名；每个模块都有最基础的className 比如：so-button
    // 若为普通样式 则在其前插前缀+模块的组合
    let list = className.split(' ').map((c) => (c === '_' ? ns : `${ns}-${c}`));

    // 若存在cssModule， 则需要将存在于style的class 样式替换为class
    if (config.cssModule) {
      list = list.map((c) => style[c] || c);
    }

    // 重新组装
    return list.join(' ');
  };

/* styles/index.tsx */
import generate from '../../utils/classname';
import buttonLess from './button.less';

// buttonClass为一个函数，接收多个属性 - 将其整合为新的class
const buttonClass = generate(buttonLess, 'button');

export default buttonClass;
```

### button基础样式
当前组件库使用为css的预处理语言less，可进行函数式处理、动态计算等操作。如果涉及到样式函数计算时，需要将当前的函数提取到公共目录`styles/mixins`下(**便于其他模块进行使用**)，根据模块名进行命名，即Button组件则命名为`button.less`,注意需要在`variable.less`中进行引入

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff7a27212a8a40238872511a3c90ecb2~tplv-k3u1fbpfcp-watermark.image?)

组件库中处理组件内部的样式时，首先需要对其基础样式进行处理。
1. 处理公共的class名称 - 即prefix-模块 进行动态计算。
2. 对组件基础样式进行处理
3. 若存在less函数式，则需要在`styles/mixins`下建立对应less文件


 ```less
@import '../../styles/variables.less';
@import '../../styles/themes/@{so-theme}.less';

// ~ 表示动态计算模块class
@button-prefix: ~'@{so-prefix}-button';
@button-disabled: ~'.@{button-prefix}-disabled';

.@button-prefix {
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  font-weight: @btn-font-weight;
  outline: none;
  background-image: none;
  border: 1px solid transparent;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  // 函数式的处理，因Button组件的大小、边框等受到size的影响，可进行公共抽取
  .button-size(@btn-padding-y; @btn-padding-x; @button-font-size-base; @line-height-base; @btn-border-radius-base);
}
 ```
  
### 属性样式分析
  在对组件进行属性分析时，已得出了影响样式的部分属性：`className、type、text、ghost、size、shape、disabled`。还用`genrate`函数处理所有的样式，并支持对属性的处理。以下的`so-button`可得出的所有class有: 
  * `@{button-prefix}-${type}`: type有多种，但处理方式一致，仅存在 **字体、背景、outline、名称、border颜色**不一致的情况。
  * `@{button-prefix}-${size}`: large/small, 直接对 `.button-size`函数调用处理即可
  * `@{button-prefix}n-ghost`: 不同的type下，当前属性需要对其`border、文本、背景色`进行处理，即可在各`@{button-prefix}-${type}`下进行扩展
  * `@{button-prefix}-text`: 需单独处理
  * `@{button-prefix}-${shape}`: shape存在circle、round
  * `@{button-prefix}-disabled`: 需单独处理，以上的情况 基本都需要区分是否已禁用

在对不同**type**的处理中，button的**hover**、**focus**、**active**进行处理。以下为部分具体样式分析
```less
/* Button下的 button.less */
.@button-prefix {
  display: inline-block;
  margin-bottom: 0;
  text-align: center;
  font-weight: @btn-font-weight;
  outline: none;
  background-image: none;
  border: 1px solid transparent;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  // 函数式的处理，因Button组件的大小、边框等受到size的影响，可进行公共抽取
  .button-size(@btn-padding-y; @btn-padding-x; @button-font-size-base; @line-height-base; @btn-border-radius-base);
  
  // type为primary的样式实现
  &-primary {
    // 不同类型的差异： 字体、背景、outline、名称、border作为参数，其他均基本一致
    .button-variant(@btn-primary-color; @btn-primary-bg; @btn-primary-border; 'primary');
  
   // 不同type下的ghost处理，也基本一致，差异点为字体颜色、背景颜色、边框颜色
    &.@{button-prefix}-ghost:not(@{button-disabled}) {
      // 背景: transparent; color: type; border: 
      .button-ghost(@btn-primary-color; @btn-primary-bg; @colors-primary;);
    }
  }
  
  // 禁用效果,其中文字和link没有背景
  &-disabled:not(&-link):not(&-text), &-disabled:not(&-link):not(&-text):hover {
    background: @button-disabled-bg;
    color: @button-disabled-color;
    fill: @button-disabled-color;
    border-color: @button-disabled-border-color;
  }
}

/* mixins/button.less 实现上述函数 */
// * button下各类型的变体
.button-variant(@color; @background; @outline; @name; @border:transparent) {
  color: @color;
  fill: @color;
  background-color: @background;
  border-color: @border;
  transition: all .15s ease-in-out; // hover - active效果

  @keyname: ~'btn-focus-@{name}';

  // 动画增加box-shadow过渡变化： box-shadow颜色、box-shadow大小、字体颜色
  @keyframes @keyname {
    0% {
      .button-case-box-shadow(@outline, 0, 60%);
    }

    60% {
      .button-case-box-shadow(@outline, (@btn-focus-width / 2), 0%);
    }

    100% {
      .button-case-box-shadow(@outline, @btn-focus-width, 0%);
    }
  }
  // hover/focus 后 需要变化 背景、边框、颜色、border粗细
  &:focus,
  &:hover {
    .button-case-border-color(@outline);
    .button-case-background(@background);
    
    color: @color;
  }

  // active时动画效果
  &:active {
    background-image: none;
    color: @color;
    animation: @keyname 0.4s ease-out;
    .button-case-border-color(@outline);
    .button-case-background(@background);
  }

  // 禁用效果 下的hover等效果 不变化
  &[disabled],
  fieldset[disabled] & {
    &:hover,
    &:focus {
      border-color: @border;
      background-color: @background;
    }

    &:active {
      animation: none;
    }
  }
}
```

# ButtonGroup组件分析
接收的参数列表
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 类名                                 | String                         | - 
| type   | 设置按钮类型。若button和buttonGroup同时设置了，以buttonGroup为准  | String    | primary \| success \| info \| warning \| danger\| **default** |
| ghost  | 幽灵属性，使按钮背景透明   | boolean     | false      |
| size     | 设置按钮大小                         | `large`  \| `small`   | -          | 
| children | 由 Button 组成的 array | ReactNode | 必填 |

## 代码实现
```tsx
/* ButtonGroup.tsx */
import classnames from 'classnames';
import React, { Children, cloneElement } from 'react';
import { ButtonSize, ButtonType } from './ButtonHelpers';
import buttonClass from './styles';

export type ButtonGroupProps = {
  size?: ButtonSize;
  type?: ButtonType;
  ghost?: boolean;
  className?: string;
  children: any;
};

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { size, type = 'default', ghost = false, children, className } = props;

  const typeSetted = type !== 'default';
  // ghost或者type: default的情况 使用透明背景
  const classNames = classnames(buttonClass('group', (ghost || !typeSetted) && 'ghost'), className);
  return (
    <div className={classNames}>
      {Children.toArray(children).map((child: any) => {
        // todo cloneElement的入参
        return cloneElement(child, { size, ghost, type: typeSetted ? type : child.props.type });
      })}
    </div>
  );
};

export default ButtonGroup;

```

## 样式处理
主要需要注意各样式之间的组合。
* 整体样式： border的radius只存在左右两端的按钮上：特殊情况 group下仅一个按钮，则需特殊处理
* 对于未被设置为disabled的按钮组合，需要在左侧设置一个线区分按钮，在非ghost下 border为白色，ghost下为 type颜色
* disabled的按钮右侧的线需要全部显示
* hover等效果：鼠标hover上需要有样式变化 - 与button一致
* active效果：点击需要有动画效果 - box-shadow变化


# ButtonGroup挂载到Button上
在一般组件库上，`ButtonGroup组件`并不会单独进行配置，都会以   
```ts
  const ButtonGroup = Button.Group
```
  
的形式进行获取。在组件设计时，就需要将`ButtonGroup`以静态属性的形式挂到`Button`之下。以下是对Button组件的改造

```tsx
/* 
* 1、在Button组件上新增一个静态属性Group
* 实现方式： 定义了两个新的静态属性
*/
type CompoundedComponent = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
  // 获取ButtonGroup的类型
  Group: typeof ButtonGroup;
  /** @internal */
  __SELF_BUTTON: boolean;
};

// 2、将Button的类型定义为CompoundedComponent
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(InternalButton) as CompoundedComponent;


// 挂载Group
Button.Group = ButtonGroup;
```


# 扩展 ref篇
## ref是什么？作用是什么？使用场景是啥？
  * **尽量避免使用ref直接操作DOM,这可能会导致应用的状态和视图不一致，优先考虑React的props和状态来进行数据传递和管理**
  * ref是一种机制，作用是 用于访问DOM元素或者组件实例的引用
  * 使用场景：
    * 访问DOM元素，直接操作DOM
    * 访问组件实例，通过ref可以获取到组件实例的引用，从而可以访问组件的方法和属性。
  * ref对象创建方式: 
    * ref=React.createRef() - 一个带有current属性的对象，组件实例挂载在current上
    * ref=useRef() - 一个带有current属性的对象，组件实例挂载在current上
  * 获取方式：
    * 字符串ref： 
    ```js
      <div ref="divRef">被保存在this.refs中: this.refs.divRef</div>
    ```

    * 函数形式ref: 
    ```js
      <div ref={(node)=> this.currentRef = node }>
        函数形式: 直接获取this.currentRef
      </div>
    ```

    * 对象形式ref: 由上面创建方式进行创建的再进行绑定
    ```js
    class Children extends React.Component{  
      render=()=><div>hello,world</div>
    }
    export default class Index extends React.Component{
      currentDom = React.createRef(null)
      currentComponentInstance = React.createRef(null)
      componentDidMount(){
        console.log(this.currentDom)
        console.log(this.currentComponentInstance)
      }
      render=()=> (
        <div>
          <div ref={ this.currentDom }>Ref对象模式获取元素或组件</div>
          <Children ref={ this.currentComponentInstance }  />
        </div>
      );
    }
    ```
  
  
  
## React.forwardRef是干啥的？
  [官方文档: forwardRef](https://zh-hans.reactjs.org/reference/react/forwardRef)  
  
  **forwardRef的定义** ：`forwardRef lets your component expose a DOM node to parent component with a ref`，即当前组件通过ref暴露一个DOM元素给父级组件。通俗讲法的作用：将子元素的ref转发给父元素

  `const SomeComponent = forwardRef(render); `
    * 参数 **render** 是一个组件的render函数，其接收`props`和`来自父组件的ref`。
    * 返回值：返回一个React组件

  作用：
  * Exposing a DOM node to the parent component-暴露一个**DOM元素/组件实例** 给父级组件
  * Forwarding a ref through multiple components - 将ref进行多级组件传递
  * Exposing an imperative handle instead of a DOM node - 返回一个DOM元素的处理句柄(useImperativeHandle)




## React.RefAttributes是什么？做什么用的？
`RefAttributes` 内置的React属性，用于在React组件上声明ref的类型。你可以使用React.RefAttribute来声明一个接受React.Ref类型的**ref的组件属性**
```ts
  // 定义相关
  interface RefObject<T> {
    readonly current: T | null;
  }
  // Bivariance hack for consistent unsoundness with RefObject
  type RefCallback<T> = { bivarianceHack(instance: T | null): void }["bivarianceHack"];
  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  // 定义一个ref属性
  interface RefAttributes<T> extends Attributes {
    ref?: Ref<T> | undefined;
  }

  // 使用
  React.RefAttributes<HTMLElement>
```



## React.ForwardRefExoticComponent 是什么？做什么用的？
  `React.ForwardRefExoticComponent` 是React中的高级接口类型，用于定义具有转发引用（Forward Ref）功能的组件， 你可以通过实现ForwardRefExoticComponent接口来创建**一个可以转发ref的组件**

```js
  interface ExoticComponent<P = {}> {
    /**
     * **NOTE**: Exotic components are not callable.
     */
    (props: P): (ReactElement|null);
    readonly $$typeof: symbol;
  }
  interface NamedExoticComponent<P = {}> extends ExoticComponent<P> {
    displayName?: string | undefined;
  }
  // will show `ForwardRef(${Component.displayName || Component.name})` in devtools by default,
  // but can be given its own specific name
  interface ForwardRefExoticComponent<P> extends NamedExoticComponent<P> {
    defaultProps?: Partial<P> | undefined;
    propTypes?: WeakValidationMap<P> | undefined;
  }
```


## React.ForwardRefRenderFunction是什么？做什么用的？
  `React.ForwardRefRenderFunction` 是React中的一种函数类型，用于定义具有转发引用（Forward Ref）功能的组件。作用：用于定义一个接受props和ref作为参数的组件渲染函数

```js
  type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;

  // T 表示被转发的引用的类型，通常是子组件的类型； P表示组件的props类型
  interface ForwardRefRenderFunction<T, P = {}> {
    // 使用泛型和interface进行函数定义：接收prop和ref的参数，返回一个ReactElement
    (props: P, ref: ForwardedRef<T>): ReactElement | null;
    displayName?: string | undefined;
    // explicit rejected with `never` required due to
    // https://github.com/microsoft/TypeScript/issues/36826
    /**
     * defaultProps are not supported on render functions
     */
    defaultProps?: never | undefined;
    /**
     * propTypes are not supported on render functions
     */
    propTypes?: never | undefined;
  }
```

## 综合： 如何将ButtonGroup当初Button的属性(如displayName)直接进行设置？
  使用交叉类型进行处理 
```js
  // 当前为React中对Function组件的定义，使用interface给组件进行了函数定义，并创建四个静态属性
  type FC<P = {}> = FunctionComponent<P>;
  interface FunctionComponent<P = {}> {
  // * 使用泛型和interface进行函数定义
    (props: P, context?: any): ReactElement<any, any> | null;
  // * 静态属性的定义
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
 }

  //  给组件新增静态属性，使用交叉类型，给函数组件新增一个静态属性 
  const Button: React.FC<Props> & {
    Group: typeof ButtonGroup;
  }

  // 可理解其Props为以下格式
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    // * 静态属性的定义
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
    Group: typeof ButtonGroup;
 }
```