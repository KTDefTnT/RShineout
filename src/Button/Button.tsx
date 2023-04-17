import classnames from 'classnames';
import React, { isValidElement, useRef } from 'react';
import { wrapSpan } from '../utils/element';
import ButtonGroup from './ButtonGroup';
import { ButtonShape, ButtonSize, ButtonType } from './ButtonHelpers';
import buttonClass from './styles/index';

// Button props的定义
export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  ghost?: boolean;
  text?: boolean;
  space?: boolean;
  href?: string;
  className?: string;
  children: React.ReactElement; // 必填
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * ~ ForwardRefExoticComponent是React中的高级类型，用于定义具有转发引用（Forward Ref）功能的组件
 * * interface ForwardRefExoticComponent<P> extends React.ForwardRefRenderFunction<any, P> {
 * * // 额外的属性可以在这里定义
 * *   defaultProps?: Partial<P>;
 * *   displayName?: string;
 * * }
 * 定义了displayName、props、defaultProps并接收P的泛型加入到props中
 * 使用：你可以通过实现ForwardRefExoticComponent接口来创建一个可以转发ref的组件
 *
 * ~ RefAttributes 内置的React属性，用于在React组件上声明ref的类型
 * 使用：你可以使用React.RefAttribute来声明一个接受React.Ref类型的ref的组件属性
 */
type CompoundedComponent = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
  Group: typeof ButtonGroup;
  /** @internal */
  __SELF_BUTTON: boolean;
};

/**
 * ~ React.ForwardRefRenderFunction是React中的一种函数类型，用于定义具有转发引用（Forward Ref）功能的组件
 * T 表示被转发的引用的类型，通常是子组件的类型； P表示组件的props类型
 * * type ForwardRefRenderFunction<T, P = {}> = (
 * *   props: P & { ref?: React.Ref<T> },
 * *   ref: React.Ref<T>
 * * ) => React.ReactElement | null;
 * 作用：用于定义一个接受props和ref作为参数的组件渲染函数
 * ref 是由Button转发而来
 */
const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement | HTMLAnchorElement, ButtonProps> = (
  props,
  ref,
) => {
  // 提取出props的参数
  const {
    type: typeProp = 'default',
    ghost: ghostProp = false,
    text = false,
    space = false,
    size,
    shape,
    disabled,
    loading,
    className,
    ...others
  } = props;

  // 处理children的情况 1. 两个中文名  2、字符串使用span包裹  3、loading且为icon
  const getChildren = () => {
    const { children } = props;
    if (!children) return children;
    const parsed = React.Children.map(wrapSpan(children, space), (item) => {
      // 为loading 状态，且为icon时  返回null
      // todo 需要配置一个Icon属性，并为其设置指定的Type用于判断
      if (loading && isValidElement(item) && item?.type) return null;

      return item;
    }).filter((v: React.ReactElement) => v !== null);

    return parsed;
  };

  // secondary 为outline与primary的结合: secondary
  // 若为非ghost和text下的  secondary, 使用primary + ghost
  const isSecondary = typeProp === 'secondary' && !ghostProp && !text;
  const type = isSecondary ? 'primary' : typeProp;
  const ghost = ghostProp || isSecondary; // 若为secondary按钮  则设为透明背景
  // if (text) color = 'currentColor'

  // 处理className
  const classNames = classnames(
    buttonClass('_', shape, type, ghost && 'ghost', {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
      disabled,
      rtl: false, // 默认使用从左到右
    }),
    className,
  );
  const children = getChildren();

  // 为Button创建ref
  const buttonRef = (ref as any) || useRef<HTMLAnchorElement | HTMLButtonElement>();

  return (
    <button
      {...others}
      type="button"
      disabled={disabled || loading}
      className={classNames}
      ref={buttonRef}
    >
      {children}
    </button>
  );
};

/**
 * * function forwardRef<T, P = {}>(
 * *  render: ForwardRefRenderFunction<T, P>
 * * ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
 */
// Button组件为：ForwardRefExoticComponent
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  // ForwardRefRenderFunction
  InternalButton,
) as CompoundedComponent;

Button.Group = ButtonGroup;
Button.displayName = 'SelfButton';

export default Button;
