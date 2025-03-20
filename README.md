# react-component-snapshot

Transform a React component to match its snapshot in **Jest** with **Testing Library**

```javascript
import {
  toSnapshot,
  snapshotOf
} from 'react-component-snapshot'
```

## With `@testing-library/react`

Get a snapshot of the component element from the `render` result

```javascript
import {
  render
} from '@testing-library/react'

import {
  toSnapshot
} from 'react-component-snapshot'

describe('`toSnapshot`', () => {
  it('matches the snapshot', () => {
    function Component () {
      return (
        <div className='grand-parent'>
          <div className='parent'>
            <div className='child'>
              TEXT
            </div>
          </div>
        </div>
      )
    }

    expect(toSnapshot(render(
      <Component />
    )))
      .toMatchSnapshot()
  })
})
```

Get a snapshot of any component element

```javascript
import {
  render
} from '@testing-library/react'

import {
  snapshotOf
} from 'react-component-snapshot'

describe('`snapshotOf`', () => {
  function Component () {
    return (
      <div className='grand-parent'>
        <div className='parent'>
          <div className='child'>
            TEXT
          </div>
        </div>
      </div>
    )
  }

  it('matches the snapshot', () => {
    const {
      container
    } = render(
      <Component />
    )

    expect(snapshotOf(container.querySelector('.child')))
      .toMatchSnapshot()
  })
})
```
