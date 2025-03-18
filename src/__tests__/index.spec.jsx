/**
 *  @typedef {ReactComponentSnapshotTypes.FiberNode} FiberNode
 */

import React from 'react'

import '@testing-library/jest-dom'
import {
  render
} from '@testing-library/react'

import snapshotOf from '#react-component-snapshot'

describe('#react-component-snapshot', () => {
  describe('`snapshotOf`', () => {
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
