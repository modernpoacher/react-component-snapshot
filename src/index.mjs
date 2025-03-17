import {
  getType
} from './react.mjs'

const REACT_COMPONENT_SNAPSHOT = Symbol.for('react.test.json')

/**
 *  @param {PropertyKey} key
 *  @returns {boolean}
 */
export function isReactFiberKey (key) {
  return String(key).startsWith('__reactFiber$')
}

/**
 *  @param {PropertyKey} key
 *  @returns {boolean}
 */
export function isReactPropsKey (key) {
  return String(key).startsWith('__reactProps$')
}

/**
 *  @param {Element} element
 *  @returns {string | undefined}
 */
export function getReactFiberKey (element) {
  return (
    Object.keys(element)
      .find(isReactFiberKey)
  )
}

/**
 *  @param {Element} element
 *  @returns {string | undefined}
 */
export function getReactPropsKey (element) {
  return (
    Object.keys(element)
      .find(isReactPropsKey)
  )
}

export function getStateNodeFiber (stateNode) {
  const key = getReactFiberKey(stateNode)

  const {
    [key]: fiber
  } = stateNode

  return fiber
}

export function getStateNodeProps (stateNode) {
  const key = getReactPropsKey(stateNode)

  const {
    [key]: props
  } = stateNode

  return props
}

/**
 *  @param {Element} element
 *  @returns {FiberNode | null | undefined}
 */
function getFiber (element) {
  const key = getReactFiberKey(element)

  if (key) {
    const { // @ts-expect-error
      [key]: fiber
    } = element

    return fiber
  }

  throw new Error('Fiber is not found')
}

function getSiblings (fiberNode) {
  const siblings = []

  let sibling = fiberNode.sibling
  while (sibling) {
    siblings.push(sibling)
    sibling = sibling.sibling
  }

  return siblings
}

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
            if ((value || false) instanceof Object && !Array.isArray(value)) return !('current' in value)
            return true
          })
      )
    )
  }

  return {}
}

function getChildren (fiberNode) {
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

function toChildren (child) {
  if (typeof child === 'string') return child

  return (
    transform(child)
  )
}

function transform (fiberNode) {
  const type = getType(fiberNode)
  const props = getProps(fiberNode)
  const children = (
    getChildren(fiberNode)
      .map(toChildren)
  )

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

export default function toSnapshot (element) {
  if (element instanceof HTMLElement) {
    const fiberNode = getFiber(element)

    return (
      transform(fiberNode)
    )
  }

  return null
}
