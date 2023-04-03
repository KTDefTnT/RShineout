import classnames from 'classnames';
import config from '../config';

type styleProps = {
  [key: string]: string;
};

/**
 * 一个高阶函数，返回一个generate function, 新增namespace， 处理css module
 * @param style - object, 当前模块的 css module - eg: button模块对应的样式集合
 * @param module - string 当前所属模块，用于添加模块名
 * @param prefix - string, 默认为 shineout,用于css前缀
 */
export default (style: styleProps, module: string, prefix: string = config.prefix) => (...args: any[]) => {
  // 组合所有传入的参数
  const className = classnames(...args);
  if (!className) return ''; // 没有任何参数的情况下 直接返回 空字符串

  // 前缀 + 模块的组合
  const ns = `${prefix}${module ? `-${module}` : '-'}`;

  // 遍历传入的样式名，若为_ 则直接使用模块级别的变量名； 若为普通样式 则在其前插前缀+模块的组合
  let list = className.split(' ').map((c) => (c === '_' ? ns : `${ns}-${c}`));

  // 若存在cssModule， 则需要将存在于style的class 样式替换为class
  if (config.cssModule) {
    list = list.map((c) => style[c] || c);
  }

  // 重新组装
  return list.join(' ');
};
