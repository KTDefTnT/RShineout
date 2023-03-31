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
    <Button ghost type="primary">Primary</Button>
    <Button ghost type="secondary">Secondary</Button>
    <Button ghost type="success">Success</Button>
    <Button ghost type="info">Info</Button>
    <Button ghost type="warning">Warning</Button>
    <Button ghost type="danger">Danger</Button>
  </div>
)
```

文字按钮
```jsx
import { Button } from 'r-shineout';

export default () => (
  <div>
    <Button text>Default</Button>
    <Button text type="primary">Primary</Button>
    <Button text type="secondary">Secondary</Button>
    <Button text type="success">Success</Button>
    <Button text type="info">Info</Button>
    <Button text type="warning">Warning</Button>
    <Button text type="danger">Danger</Button>
  </div>
)
```

禁用效果
```jsx
import { Button } from 'r-shineout';

export default () => (
  <div>
    <div>
      <Button disabled>Default</Button>
      <Button disabled type="primary">Primary</Button>
      <Button disabled type="secondary">Secondary</Button>
      <Button disabled type="success">Success</Button>
      <Button disabled type="info">Info</Button>
      <Button disabled type="warning">Warning</Button>
      <Button disabled type="danger">Danger</Button>
      <Button disabled type="link">Link</Button>
    </div>
    <div style={{ margin: '10px 0px' }}>
      <Button disabled text>Default</Button>
      <Button disabled text type="primary">Primary</Button>
      <Button disabled text type="secondary">Secondary</Button>
      <Button disabled text type="success">Success</Button>
      <Button disabled text type="info">Info</Button>
      <Button disabled text type="warning">Warning</Button>
      <Button disabled text type="danger">Danger</Button>
      <Button disabled text type="link">Link</Button>
    </div>
  </div>
)
```

不同尺寸
```jsx
import { Button } from 'r-shineout';

export default () => (
  <div>
    <div>
      <Button size="small">Default</Button>
      <Button size="small" type="primary">Primary</Button>
      <Button size="small" type="secondary">Secondary</Button>
      <Button size="small" type="success">Success</Button>
      <Button size="small" type="info">Info</Button>
      <Button size="small" type="warning">Warning</Button>
      <Button size="small" type="danger">Danger</Button>
      <Button size="small" type="link">Link</Button>
    </div>
    <div style={{ margin: '10px 0px' }}>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="success">Success</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
      <Button size="large" type="link">Link</Button>
    </div>
    <div >
      <Button size="large">Default</Button>
      <Button size="large" type="primary">Primary</Button>
      <Button size="large" type="secondary">Secondary</Button>
      <Button size="large" type="success">Success</Button>
      <Button size="large" type="info">Info</Button>
      <Button size="large" type="warning">Warning</Button>
      <Button size="large" type="danger">Danger</Button>
      <Button size="large" type="link">Link</Button>
    </div>
  </div>
)
```


不同尺寸
```jsx
import { Button } from 'r-shineout';

// const ButtonGroup = Button.Group;
export default () => (
  <div>
    <ButtonGroup>
      <Button size="small">Default</Button>
      <Button size="small" type="primary">Primary</Button>
      <Button size="small" type="secondary">Secondary</Button>
      <Button size="small" type="success">Success</Button>
      <Button size="small" type="info">Info</Button>
      <Button size="small" type="warning">Warning</Button>
      <Button size="small" type="danger">Danger</Button>
      <Button size="small" type="link">Link</Button>
    </ButtonGroup>
  </div>
)
```

