import buttonLess from './button.less';
import generate from '../../utils/classname';

const buttonClass = generate(buttonLess, 'button');
console.log(buttonClass);
export default buttonClass;