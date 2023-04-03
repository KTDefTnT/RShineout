import React from 'react';

export const wrapSpan = (children: React.ReactElement, space: boolean) => {
  const SPACE = ' ';
  const isTwoCNChar = (str: string) => /^[\u4e00-\u9fa5]{2}$/.test(str);
  if (!children) return children;

  if (typeof children === 'string') {
    // 检测为两个中文字符 且需要插入空格
    if (isTwoCNChar(children) && space) return <span>{(children as string).split('').join(SPACE)}</span>;

    // 非两个中文的string类型
    return <span>{children}</span>;
  }

  // 正常React Element直接进行返回
  return children;
};

export default {
  wrapSpan,
};
