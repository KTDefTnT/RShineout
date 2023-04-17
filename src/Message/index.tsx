import React from 'react';
import { MessageProps, MessageType, PositionType, PositionTypes } from './MesageHelper';
import { destory, getComponent } from './messager';

let defaultOptions: Partial<MessageProps> = {};
// 高阶函数，自定义一个Message的容器
const create =
  (type: MessageType) =>
  (content: React.ReactElement, duration: number, options: object): void => {
    const assignOptions = { ...defaultOptions, ...options };
    const newDuration = [defaultOptions.duration, duration, 3].find((d) => typeof d === 'number') as number;
    const { className, position = 'top', title, hideClose, onClose } = assignOptions;

    getComponent(position).then((messager) => {
      messager.addMessage({
        className,
        type,
        content,
        duration: newDuration,
        title,
        hideClose,
        position,
        onClose,
      });
    });
  };

export default {
  show: create('success'),
  success: create('success'),
  warn: create('warning'),
  warning: create('warning'),
  danger: create('danger'),
  error: create('danger'),
  close: (key: PositionType) => {
    if (key) {
      destory(key);
    } else {
      PositionTypes.forEach((type) => {
        destory(type);
      });
    }
  },
  setOptions: (options: MessageProps) => {
    defaultOptions = options;
  },
};
