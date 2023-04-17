import generate from '../../utils/classname';
import alertLess from './alert.less';

const alertClass = generate(alertLess, 'alert');

// 对普通变量而言: export default 只能够导出已定义的元素 不能直接使用export default xxx
export default alertClass;
