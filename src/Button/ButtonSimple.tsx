import classnames from 'classnames';
import React, { isValidElement } from 'react';
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
// 当前方式为props添加属性
// type ButtonPropsExpand = ButtonProps & {
//   Group: typeof ButtonGroup;
// }
/**
 * FC的定义
 * type FC<P = {}> = FunctionComponent<P>;
 * interface FunctionComponent<P = {}> {
 * * 使用泛型和interface进行函数定义
 *   (props: P, context?: any): ReactElement<any, any> | null;
 * * 静态属性的定义
 *   propTypes?: WeakValidationMap<P> | undefined;
 *   contextTypes?: ValidationMap<any> | undefined;
 *   defaultProps?: Partial<P> | undefined;
 *   displayName?: string | undefined;
 * }
 */

// 当前处理方式 为Button增加静态属性
const Button: React.FC<ButtonProps> & {
  Group: typeof ButtonGroup;
} = (props) => {
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

  return (
    <button
      {...others}
      type="button"
      disabled={disabled || loading}
      className={classNames}
    >
      {children}
    </button>
  );
};

Button.Group = ButtonGroup;
Button.displayName = 'SelfButton';

export default Button;
