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
