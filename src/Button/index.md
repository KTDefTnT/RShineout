# Button

基础使用

```jsx
import { Button } from 'r-shineout';

export default () => (
  <div>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="secondary">Secondary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button>
    <Button type="link">Link</Button>
  </div>
)
```

透明背景

```jsx
import { Button } from 'r-shineout';

export default () => (
  <div>
    <Button ghost>Default</Button>
    <Button ghost type="primary">Primary</Button>
    <Button ghost type="secondary">Secondary</Button>
    <Button ghost type="success">Success</Button>
    <Button ghost type="info">Info</Button>
    <Button ghost type="warning">Warning</Button>
    <Button ghost type="danger">Danger</Button>
    <Button ghost type="link">Link</Button>
  </div>
)
```