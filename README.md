# react-component-snapshot

Transform a React component to match its snapshot in Jest

```javascript
import toSnapshot from 'react-component-snapshot'

const {
  container: {
    firstElementChild
  }
} = render(
  <Component />
)

expect(toSnapshot(element))
  .toMatchSnapshot()
```
