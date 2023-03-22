type ConfigProps = {
  cssModule?: boolean | string; // 是否为css模块
  prefix: string; // 前缀
  locale: string; // 国际化 - 语言
  autoSSL?: boolean;
  delay?: boolean | undefined; // 延迟时间
  scrollRatio?: number;
  trim?: boolean;
  spin?: boolean;
  caret?: string;
  direction?: string;
  popupContainer?: string;
};

const config: ConfigProps = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: process.env.LOCAL || 'en-US',
  autoSSL: false,
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
  caret: undefined,
  direction: 'ltr',
  popupContainer: undefined,
};

export default config;
