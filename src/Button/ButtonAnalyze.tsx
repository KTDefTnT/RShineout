import classnames from 'classnames';
import React, { isValidElement } from 'react';
import { wrapSpan } from '../utils/element';
import ButtonGroup from './ButtonGroup';
import { ButtonShape, ButtonSize, ButtonType } from './ButtonHelpers';
import buttonClass from './styles/index';

type ButtonProps = {
  className?: string;
  type?: ButtonType;
  ghost?: boolean;
  text?: boolean;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  space?: boolean;
  children?: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type CompoundedComponent = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
  Group: typeof ButtonGroup;
  /** @internal */
  __SELF_BUTTON: boolean;
};

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
      // todo 需要配置一个Icon属性，并为其设置指定的Type用于判断
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(InternalButton) as CompoundedComponent;

Button.Group = ButtonGroup;

export default Button;
