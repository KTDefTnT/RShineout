// ~ as const的使用 - 将当前创建的元素定义为常量 - 代表仅支持当前三个，不允许扩充
// 按钮的尺寸
const ButtonSizes = ['large', 'small'] as const;
export type ButtonSize = (typeof ButtonSizes)[number];

// 按钮的类型
const ButtonTypes = ['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] as const;
export type ButtonType = (typeof ButtonTypes)[number];

// 按钮的形状
const ButtonShapes = ['circle', 'round'] as const;
export type ButtonShape = (typeof ButtonShapes)[number];
