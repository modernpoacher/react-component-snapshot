# react-component-snapshot

Transform a React component to match its snapshot in **Jest** with **Testing Library**

```javascript
import snapshotOf from 'react-component-snapshot'
```

## With `@testing-library/react`

```javascript
import {
  render
} from '@testing-library/react'

import snapshotOf from 'react-component-snapshot'

describe('snapshotOf', () => {
  class Component extends React.Component {
    render () {
      return <div />
    }
  }

  it('matches the snapshot', () => {
    const {
      container: {
        firstElementChild: element
      }
    } = render(
      <Component />
    )

    expect(snapshotOf(element))
      .toMatchSnapshot()
  })
})
```
