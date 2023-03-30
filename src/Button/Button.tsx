import React, { isValidElement } from 'react';
import classnames from 'classnames';
import { wrapSpan } from '../utils/element';
import { ButtonSize, ButtonShape, ButtonType } from './ButtonHelpers';
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
}

const Button: React.FC<ButtonProps> = (props) => {
  // 提取出props的参数
  const {
    type: typeProp = "default",
    ghost: ghostProp = false,
    text = false,
    space = false,
    size,
    shape,
    disabled,
    loading,
    ...others
  } = props;

  // 处理children的情况 1. 两个中文名  2、字符串使用span包裹  3、loading且为icon
  const getChildren = () => {
    const { children } = props;
    if (!children) return children;
    const parsed =  React.Children.map(wrapSpan(children, space), (item) => {
      // 为loading 状态，且为icon时  返回null
      if (loading && isValidElement(item) && item?.type) return null;

      return item;
    }).filter((v: React.ReactElement) => v !== null);

    return parsed;
  }

  // secondary 为outline与primary的结合: secondary
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
    props.className
  );

  const children = getChildren();
  return (
    <button {...others} disabled={disabled || loading} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
