// 需要一个包含父容器新建和销毁的方法
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import { MessageRef, PositionType } from './MesageHelper';
import messageClass from './styles';
// import { getDefaultContainer } from '../config'
type elementsProps = {
  [key: string]: HTMLElement;
};

type componentsProps = {
  [key: string]: MessageRef;
};

const elements: elementsProps = {};
// 作为一个闭包存在，避免创建多个重复的组件
const components: componentsProps = {};

// 创建一个父容器，并将其进行挂载
function getElement(type: PositionType) {
  const defaultContainer = document.body;
  const div = document.createElement('div');
  div.className = messageClass('_', type);

  defaultContainer.appendChild(div);

  // 保存当前已创建的类型
  elements[type] = div;
  return div;
}

// 销毁父容器的方法
export function destory(type: PositionType) {
  // 判断当前是否存在
  if (elements[type]) {
    ReactDOM.unmountComponentAtNode(elements[type]);
    const el = elements[type];
    if (el && el.parentNode) el.parentNode.removeChild(el);
    delete elements[type];
  }

  if (components[type]) {
    delete components[type];
  }
}

// 获取父容器，将具体的所有提示容器挂载到父容器上， 并返回当前的容器 用于执行
export function getComponent(type: PositionType) {
  // 定义Promise的返回值
  return new Promise<MessageRef>((resolve) => {
    const component = components[type];
    if (component) {
      resolve(component);
    } else {
      ReactDOM.render(
        <Container
          ref={(comp: MessageRef) => {
            components[type] = comp;
            // comp上需要支持的方法 addMessage
            resolve(comp);
          }}
          onDestory={destory.bind(null, type)}
        />,
        getElement(type),
      );
    }
  });
}
