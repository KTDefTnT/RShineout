import React from 'react';
import classnames from 'classnames';
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
    type = "default",
    ghost = false,
    text = false,
    space = false,
    size,
    shape,
    disabled,
    loading,
    ...others
  } = props;

  // 处理className
  const classNames = classnames(
    buttonClass('_', shape, type, ghost && 'ghost', {
      large: size === 'large',
      small: size === 'small',
      text: text && 'text',
      disabled,
    }),
    props.className
  );

  return (
    <button {...others} disabled={disabled || loading} className={classNames}>
      {props.children}
    </button>
  );
};

export default Button;
