# Message

基本用法
```jsx
import { Message, Button } from 'r-shineout';

export default () => {
  const showMessage = () => {
    Message.show('测试一下', 3);
  };
  return (
    <div>
      <Button onClick={showMessage}>show</Button>
      <Button type="primary" onClick={() => Message.error('错误的测试', 0)}>error</Button>
    </div>
  )
}
```