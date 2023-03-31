import React, { Children, cloneElement } from 'react';
import { ButtonSize, ButtonType } from "./ButtonHelpers";
import buttonClass from './styles';

export type ButtonGroupProps = {
  size?: ButtonSize;
  type?: ButtonType;
  ghost?: boolean;
  className?: string;
  children: any;
};

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  const { size, type, ghost, children } = props;

  const typeSetted = type !== 'default';

  // ghost或者type: default的情况 使用透明背景
  const className = buttonClass('group', (ghost || !typeSetted) && 'ghost', props.className);
  return (
    <div className={className}>
      {
        // todo child应该怎么定义
        Children.toArray(children).map((child: any) =>
          // todo cloneElement的入参
          cloneElement(child, { size, ghost, type: typeSetted ? type : child.props.type })
        )
      }
    </div>
  );
}

export default ButtonGroup;