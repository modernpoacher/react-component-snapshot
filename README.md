# react-component-snapshot

Transform a React component to match its snapshot in Jest

```javascript
import snapshotOf from 'react-component-snapshot'

const {
  container: {
    firstElementChild: element
  }
} = render(
  <Component />
)

expect(snapshotOf(element))
  .toMatchSnapshot()
```
