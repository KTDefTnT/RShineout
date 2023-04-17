import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { AlertType } from './AlertHelper';
import alertClass from './styles/index';

type AlertProps = {
  children: React.ReactNode;
  className?: string;
  style?: object;
  type?: AlertType;
  icon?: boolean | React.ReactNode;
  iconSize?: number;
  hideClose?: boolean;
  onClose?: () => void;
};

const InnerAlert: React.ForwardRefRenderFunction<HTMLElement, AlertProps> = (props, ref) => {
  const { children, className, style, type = 'warning', hideClose = true } = props;

  const [dismiss, setDismiss] = useState<boolean | number>(0);
  // 渲染icon
  const renderIcon = (): React.ReactNode | boolean => {
    const { icon, iconSize = 16 } = props;
    // todo 需要定义为内置icon
    const icons = {
      success: 's',
      info: 'i',
      warning: 'w',
      danger: 'd',
    };

    let iconContent = null;
    // 判断当前的icon是否为布尔值，若为布尔值  则使用type对应的icon
    if (typeof icon === 'boolean' && icon) {
      iconContent = icons[type];
    }

    if (!iconContent) return null;

    const iconStyle = {
      width: iconSize,
      height: iconSize,
      marginRright: iconSize / 2,
    };

    return (
      <div
        className={alertClass('icon')}
        style={iconStyle}
      >
        {iconContent}
      </div>
    );
  };

  // 处理dissmiss
  const handleDissmiss = () => {
    const { onClose } = props;
    setDismiss(2);
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  // 渲染关闭按钮
  const handleClose = () => {
    handleDissmiss();
  };

  const renderClose = (): React.ReactElement => {
    return (
      <a
        className={alertClass('close')}
        onClick={handleClose}
      >
        x
      </a>
    );
  };

  const icon = renderIcon();
  const wrapClassName = classNames(
    alertClass('_', type, icon && 'with-icon', dismiss === 1 && 'dismissed', !hideClose && 'with-close'),
    className,
  );

  const alertRef = (ref as any) || useRef<HTMLElement>();

  // 如果dismiss为2时，返回null
  if (dismiss === 2) return null;

  return (
    <div
      className={wrapClassName}
      style={style}
      ref={alertRef}
    >
      {!hideClose && renderClose()}
      {icon}
      <div className={alertClass('content')}>{children}</div>
    </div>
  );
};

const Alert = React.forwardRef<HTMLElement, AlertProps>(InnerAlert);

Alert.displayName = 'Alert';

export default Alert;
