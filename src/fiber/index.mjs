/**
 *  @typedef {import('@testing-library/react').RenderResult} RenderType
 *  @typedef {ReactComponentSnapshotTypes.FiberNode} FiberNode
 */

import {
  getComponentNameFromFiber as getType
} from 'react-component-name'

import {
  REACT_COMPONENT_SNAPSHOT
} from './symbols.mjs'

/**
 *  @param {unknown} v
 *  @returns {v is object}
 */
function isObject (v) {
  return (v || false) instanceof Object && !Array.isArray(v)
}

/**
 *  @param {PropertyKey} key
 *  @returns {boolean}
 */
function isReactFiberKey (key) {
  return String(key).startsWith('__reactFiber$')
}

/**
 *  @param {PropertyKey} key
 *  @returns {boolean}
 */
function isReactPropsKey (key) {
  return String(key).startsWith('__reactProps$')
}

/**
 *  @param {Element | Text | React.Component<any, any, any>} stateNode
 *  @returns {string | undefined}
 */
function getReactFiberKey (stateNode) {
  return (
    Object.keys(stateNode)
      .find(isReactFiberKey)
  )
}

/**
 *  @param {Element | Text | React.Component<any, any, any>} stateNode
 *  @returns {string | undefined}
 */
function getReactPropsKey (stateNode) {
  return (
    Object.keys(stateNode)
      .find(isReactPropsKey)
  )
}

/**
 *  @param {Element | Text | React.Component<any, any, any>} stateNode
 *  @returns {Record<PropertyKey, unknown> | null}
 */
export function getStateNodeFiber (stateNode) {
  const key = getReactFiberKey(stateNode)

  if (key) {
    const { // @ts-expect-error
      [key]: fiber = null
    } = stateNode

    return fiber
  }

  return null
}

/**
 *  @param {React.Component<any, any, any> | Element | Text} stateNode
 *  @returns {Record<PropertyKey, unknown> | null}
 */
export function getStateNodeProps (stateNode) {
  const key = getReactPropsKey(stateNode)

  if (key) {
    const { // @ts-expect-error
      [key]: props = null
    } = stateNode

    return props
  }

  return null
}

/**
 *  @param {Element} element
 *  @returns {FiberNode | null}
 */
export function getFiber (element) {
  const key = getReactFiberKey(element)

  if (key) {
    const { // @ts-expect-error
      [key]: fiber = null
    } = element

    return fiber
  }

  return null
}

/**
 *  @param {FiberNode} fiberNode
 *  @returns {FiberNode[]}
 */
function getSiblings (fiberNode) {
  const siblings = []

  let sibling = fiberNode.sibling
  while (sibling) {
    siblings.push(sibling)
    sibling = sibling.sibling
  }

  return siblings
}

/**
 *  @param {FiberNode} fiberNode
 *  @returns {Record<PropertyKey, unknown>}
 */
function getProps (fiberNode) {
  const stateNode = fiberNode.stateNode

  /**
   *  State node may be null on class components
   */
  if (stateNode) {
    const props = getStateNodeProps(stateNode) ?? {}

    return (
      Object.fromEntries(
        Object.entries(props)
          .filter(([key]) => key !== 'children')
          .filter(([key, value]) => {
            if (isObject(value)) return !('current' in value)
            return true
          })
      )
    )
  }

  return {}
}

/**
 *  @param {FiberNode} fiberNode
 *  @returns {Array<string | FiberNode>}
 */
function getChildrenOf (fiberNode) {
  const child = fiberNode.child

  if (child) {
    const siblings = getSiblings(child)

    return [child].concat(siblings).map((child) => {
      const stateNode = child.stateNode

      if (stateNode instanceof Text) {
        return stateNode.data
      }

      return child
    })
  }

  const stateNode = fiberNode.stateNode

  if (stateNode) {
    /**
     *  Get the text as a prop from the instance
     */
    const {
      children
    } = getStateNodeProps(stateNode) ?? {}

    if (typeof children === 'string') {
      return [children]
    }
  }

  return []
}

/**
 *  @param {FiberNode | string} child
 *  @returns {string | Record<PropertyKey, unknown>}
 */
function toChildren (child) {
  if (typeof child === 'string') return child

  return (
    getSnapshot(child)
  )
}

/**
 *  @param {FiberNode} fiberNode
 *  @returns {Array<string | Record<PropertyKey, unknown>>}
 */
function getChildren (fiberNode) {
  return (
    getChildrenOf(fiberNode)
      .map(toChildren)
  )
}

/**
 *  @param {FiberNode} fiberNode
 *  @returns {Record<PropertyKey, unknown>}
 */
export default function getSnapshot (fiberNode) {
  const type = getType(fiberNode)
  const props = getProps(fiberNode)
  const children = getChildren(fiberNode)

  return (
    Object.defineProperty({
      type,
      props,
      children
    },
    '$$typeof', {
      value: REACT_COMPONENT_SNAPSHOT
    })
  )
}
