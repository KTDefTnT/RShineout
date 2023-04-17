import classNames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import Alert from '../Alert';
import { addMessageFunc, MessageProps, MessageRef, PositionType } from './MesageHelper';
import messageClass from './styles';

type ContainerProps = {
  // children: React.ReactElement;
  onDestory: () => void;
};

// 创建一个Message的容器
const innerContainer: React.ForwardRefRenderFunction<MessageRef, ContainerProps> = (props, ref) => {
  // 内置一个messages的数组，用于管理所有的Message组件
  const [messages, setMessages] = useState<MessageProps[]>([]);

  // 每一个类型的容器都绑定了一个type - postion
  const { onDestory } = props;

  const closeMessage = (id: number) => {
    console.log('mesag', messages, id);
    // 如果消息队列中没有数据了，则销毁父容器
    if (messages.length === 0) {
      onDestory();
      return;
    }

    setMessages((messageList) => messageList.filter((clearMessage) => clearMessage.id !== id));
  };

  const handleClassName = (position: PositionType, className?: string): string => {
    return classNames(messageClass('item', `item-show-${position}`), className);
  };

  // todo 当前的组件怎么暴露出去？ - 使用forwardRef + useImpretiveHandle， 自定义需要暴露的ref对象
  useImperativeHandle(
    ref,
    () => {
      // 实现一个addMessage
      const addMessage: addMessageFunc = (message) => {
        const { duration } = message;
        const id = Math.ceil(Math.random() * 10000) + 5;
        // todo 理解闭包问题
        console.log('message', id, message);
        // const newMessages = messages.concat({ id, ...message });
        setMessages((messageList) => [...messageList, { ...message, id }]);
        // 如果当前设置了duration，则需要设置一个定时器 自动清除当前的message
        if (duration > 0) {
          setTimeout(() => {
            // 清除当前的message
            closeMessage(id);
            // setMessages((messageList) => {
            //   return messageList.filter((clearMessage) => clearMessage.id !== id);
            // });
          }, duration * 1000);
        }
      };

      const close = () => {
        console.log('close');
        // setMessages([]);
      };

      return {
        addMessage,
        close,
      };
    },
    [],
  );

  return (
    <>
      {messages.map(({ id, content, type, title, className, position, hideClose }) => (
        <div
          key={id}
          className={handleClassName(position, className)}
        >
          <Alert
            icon
            type={type}
            onClose={onDestory}
            hideClose={hideClose}
          >
            {title && <h3>{title}</h3>}
            {content}
          </Alert>
        </div>
      ))}
    </>
  );
};

const Container = React.forwardRef<MessageRef, ContainerProps>(innerContainer);
export default Container;
