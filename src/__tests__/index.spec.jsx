/**
 *  @typedef {ReactComponentSnapshotTypes.FiberNode} FiberNode
 */

import React from 'react'

import '@testing-library/jest-dom'
import {
  render
} from '@testing-library/react'

import {
  toSnapshot,
  snapshotOf,
  getContainerElementFromRender,
  getComponentElementFromRender,
  getComponentElement,
  toSnapshotFromContainerElement,
  toSnapshotFromComponentElement
} from '#react-component-snapshot'

describe('#react-component-snapshot', () => {
  describe('`toSnapshot`', () => {
    describe('The component is a function', () => {
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

      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='grand-parent'>
              TEXT (1)
              <div className='parent'>
                TEXT (2)
                <div className='child'>
                  TEXT (3)
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

      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='grand-parent'>
              TEXT (1)
              <div className='parent'>
                TEXT (2)
                <div className='child'>
                  TEXT (3)
                </div>
                TEXT (2)
                <div className='child'>
                  TEXT (3)
                </div>
                TEXT (2)
              </div>
              TEXT (1)
            </div>
          )
        }

        expect(toSnapshot(render(
          <Component />
        )))
          .toMatchSnapshot()
      })

      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='grand-parent'>
              <div className='parent'>
                <div className='child'>
                  TEXT (3)
                </div>
                TEXT (2)
              </div>
              TEXT (1)
            </div>
          )
        }

        expect(toSnapshot(render(
          <Component />
        )))
          .toMatchSnapshot()
      })
    })

    describe('The component is a class', () => {
      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
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
        }

        expect(toSnapshot(render(
          <Component />
        )))
          .toMatchSnapshot()
      })

      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
            return (
              <div className='grand-parent'>
                TEXT (1)
                <div className='parent'>
                  TEXT (2)
                  <div className='child'>
                    TEXT (3)
                  </div>
                </div>
              </div>
            )
          }
        }

        expect(toSnapshot(render(
          <Component />
        )))
          .toMatchSnapshot()
      })

      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
            return (
              <div className='grand-parent'>
                TEXT (1)
                <div className='parent'>
                  TEXT (2)
                  <div className='child'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                  <div className='child'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                </div>
                TEXT (1)
              </div>
            )
          }
        }

        expect(toSnapshot(render(
          <Component />
        )))
          .toMatchSnapshot()
      })

      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
            return (
              <div className='grand-parent'>
                <div className='parent'>
                  <div className='child'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                </div>
                TEXT (1)
              </div>
            )
          }
        }

        expect(toSnapshot(render(
          <Component />
        )))
          .toMatchSnapshot()
      })
    })
  })

  describe('`snapshotOf`', () => {
    describe('The component is a function', () => {
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

      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='grand-parent'>
              TEXT (1)
              <div className='parent'>
                TEXT (2)
                <div className='child'>
                  TEXT (3)
                </div>
              </div>
            </div>
          )
        }

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

      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='grand-parent'>
              TEXT (1)
              <div className='parent'>
                TEXT (2)
                <div className='child'>
                  TEXT (3)
                </div>
                TEXT (2)
                <div className='child'>
                  TEXT (3)
                </div>
                TEXT (2)
              </div>
              TEXT (1)
            </div>
          )
        }

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

      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='grand-parent'>
              <div className='parent'>
                <div className='child'>
                  TEXT (3)
                </div>
                TEXT (2)
              </div>
              TEXT (1)
            </div>
          )
        }

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

    describe('The component is a class', () => {
      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
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
        }

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

      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
            return (
              <div className='grand-parent'>
                TEXT (1)
                <div className='parent'>
                  TEXT (2)
                  <div className='child'>
                    TEXT (3)
                  </div>
                </div>
              </div>
            )
          }
        }

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

      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
            return (
              <div className='grand-parent'>
                TEXT (1)
                <div className='parent'>
                  TEXT (2)
                  <div className='child'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                  <div className='child'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                </div>
                TEXT (1)
              </div>
            )
          }
        }

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

      it('matches the snapshot', () => {
        class Component extends React.Component {
          render () {
            return (
              <div className='grand-parent'>
                <div className='parent'>
                  <div className='child'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                </div>
                TEXT (1)
              </div>
            )
          }
        }

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
  })

  describe('`getContainerElementFromRender`', () => {
    describe('The component is a function', () => {
      it('gets the element', () => {
        function Component () {
          return (
            <div />
          )
        }

        expect(getContainerElementFromRender(render(
          <Component />
        )))
          .toBeInstanceOf(HTMLDivElement)
      })
    })

    describe('The component is a class', () => {
      it('gets the element', () => {
        class Component extends React.Component {
          render () {
            return (
              <div />
            )
          }
        }

        expect(getContainerElementFromRender(render(
          <Component />
        )))
          .toBeInstanceOf(HTMLDivElement)
      })
    })
  })

  describe('`getComponentElementFromRender`', () => {
    describe('The component is a function', () => {
      it('gets the element', () => {
        function Component () {
          return (
            <div />
          )
        }

        expect(getComponentElementFromRender(render(
          <Component />
        )))
          .toBeInstanceOf(HTMLDivElement)
      })
    })

    describe('The component is a class', () => {
      it('gets the element', () => {
        class Component extends React.Component {
          render () {
            return (
              <div />
            )
          }
        }

        expect(getComponentElementFromRender(render(
          <Component />
        )))
          .toBeInstanceOf(HTMLDivElement)
      })
    })
  })

  describe('`getComponentElement`', () => {
    describe('The component is a function', () => {
      it('gets the element', () => {
        function Component () {
          return (
            <div />
          )
        }

        expect(getComponentElement(render(
          <Component />
        )))
          .toBeInstanceOf(HTMLDivElement)
      })
    })

    describe('The component is a class', () => {
      it('gets the element', () => {
        class Component extends React.Component {
          render () {
            return (
              <div />
            )
          }
        }

        expect(getComponentElement(render(
          <Component />
        )))
          .toBeInstanceOf(HTMLDivElement)
      })
    })
  })

  describe('`toSnapshotFromContainerElement`', () => {
    describe('The component is a function', () => {
      it('gets the element', () => {
        function Component () {
          return (
            <div />
          )
        }

        const containerElement = getContainerElementFromRender(render(
          <Component />
        ))

        expect(toSnapshotFromContainerElement(containerElement))
          .toMatchSnapshot()
      })
    })

    describe('The component is a class', () => {
      it('gets the element', () => {
        class Component extends React.Component {
          render () {
            return (
              <div />
            )
          }
        }

        const containerElement = getContainerElementFromRender(render(
          <Component />
        ))

        expect(toSnapshotFromContainerElement(containerElement))
          .toMatchSnapshot()
      })
    })
  })

  describe('`toSnapshotFromComponentElement`', () => {
    describe('The component is a function', () => {
      it('gets the element', () => {
        function Component () {
          return (
            <div />
          )
        }

        const componentElement = getComponentElementFromRender(render(
          <Component />
        ))

        expect(toSnapshotFromComponentElement(componentElement))
          .toMatchSnapshot()
      })
    })

    describe('The component is a class', () => {
      it('gets the element', () => {
        class Component extends React.Component {
          render () {
            return (
              <div />
            )
          }
        }

        const componentElement = getComponentElementFromRender(render(
          <Component />
        ))

        expect(toSnapshotFromComponentElement(componentElement))
          .toMatchSnapshot()
      })
    })
  })
})
