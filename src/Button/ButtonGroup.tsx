import React, { Children, cloneElement } from 'react';
import classnames from 'classnames';
import { ButtonSize, ButtonType } from './ButtonHelpers';
import buttonClass from './styles';

export type ButtonGroupProps = {
    size?: ButtonSize;
  type?: ButtonType;
  ghost?: boolean;
  className?: string;
  children: any;
}

// eslint-disable-next-line react/function-component-definition
const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const {
    size, type = 'default', ghost = false, children, className,
  } = props;

  const typeSetted = type !== 'default';
  // ghost或者type: default的情况 使用透明背景
  const classNames = classnames(
    buttonClass('group', (ghost || !typeSetted) && 'ghost'),
    className,
  );
  return (
    <div className={classNames}>
      {
        // todo child应该怎么定义
        Children.toArray(children).map((child: any) => {
          console.log('porp', typeSetted, child.props);
          // todo cloneElement的入参
          return cloneElement(child, { size, ghost, type: typeSetted ? type : child.props.type });
        })
      }
    </div>
  );
};

export default ButtonGroup;
