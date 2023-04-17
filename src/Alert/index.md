
# Alert

基础用法
```jsx
import { Alert } from 'r-shineout';

export default () => (
  <div>
    <Alert>success</Alert>
    <Alert type="info">info</Alert>
    <Alert type="warning">warning</Alert>
    <Alert type="danger">danger</Alert>
  </div>
)
```

带有Icon
```jsx
import { Alert } from 'r-shineout';

export default () => (
  <div>
    <Alert type="success" icon>success - boolean</Alert>
    <Alert type="info" icon>info - boolean</Alert>
    <Alert type="warning" icon>warning - boolean</Alert>
    <Alert type="danger" icon>danger - boolean</Alert>
  </div>
)
```

带有关闭按钮
```jsx
import { Alert } from 'r-shineout';

export default () => (
  <div>
    <Alert type="success" hideClose={false}>success</Alert>
    <Alert type="info" hideClose={false}>info</Alert>
    <Alert type="warning" hideClose={false}>warning</Alert>
    <Alert type="danger" hideClose={false}>danger</Alert>
  </div>
)
```