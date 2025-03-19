/**
 *  @typedef {ReactComponentSnapshotTypes.FiberNode} FiberNode
 */

import React from 'react'

import '@testing-library/jest-dom'
import {
  render
} from '@testing-library/react'

import snapshotOf, {
  getComponentElement
} from '#react-component-snapshot'

describe('#react-component-snapshot', () => {
  describe('`snapshotOf`', () => {
    describe('The component is a function', () => {
      it('matches the snapshot', () => {
        function Component () {
          return (
            <div className='1'>
              <div className='2'>
                <div className='3'>
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
            <div className='1'>
              TEXT (1)
              <div className='2'>
                TEXT (2)
                <div className='3'>
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
            <div className='1'>
              TEXT (1)
              <div className='2'>
                TEXT (2)
                <div className='3'>
                  TEXT (3)
                </div>
                TEXT (2)
                <div className='3'>
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
            <div className='1'>
              <div className='2'>
                <div className='3'>
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
              <div className='1'>
                <div className='2'>
                  <div className='3'>
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
              <div className='1'>
                TEXT (1)
                <div className='2'>
                  TEXT (2)
                  <div className='3'>
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
              <div className='1'>
                TEXT (1)
                <div className='2'>
                  TEXT (2)
                  <div className='3'>
                    TEXT (3)
                  </div>
                  TEXT (2)
                  <div className='3'>
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
              <div className='1'>
                <div className='2'>
                  <div className='3'>
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
})
