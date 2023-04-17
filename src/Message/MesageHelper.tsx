const MessageTypes = ['success', 'info', 'warning', 'danger'] as const;
export type MessageType = (typeof MessageTypes)[number];

export const PositionTypes = ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
export type PositionType = (typeof PositionTypes)[number];

export type MessageProps = {
  id?: number;
  className?: string;
  duration: number;
  position: PositionType;
  type?: MessageType;
  content?: React.ReactElement;
  title?: React.ReactElement;
  hideClose?: boolean;
  onClose?: () => void;
};

// 定义添加的函数
export type addMessageFunc = (message: MessageProps) => void;
export type closeFnc = () => void;

export type MessageRef = {
  addMessage: addMessageFunc;
  close: closeFnc;
};
