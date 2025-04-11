/**
 *  @typedef {import('@testing-library/react').RenderResult} RenderType
 *  @typedef {ReactComponentSnapshotTypes.FiberNode} FiberNode
 */

import getSnapshot, {
  getFiber
} from './fiber/index.mjs'

/**
 *  @param {RenderType} render
 *  @returns {Element | null}
 */
export function getComponentElement ({
  container: {
    firstElementChild: componentElement = null
  }
}) {
  return componentElement
}

/**
 *  @param {RenderType} render
 *  @returns {Element | null}
 */
export function getComponentElementFromRender (render) {
  return (
    getComponentElementFromContainerElement(
      getContainerElementFromRender(render)
    )
  )
}

/**
 *  @param {RenderType} render
 *  @returns {Element}
 */
export function getContainerElementFromRender ({
  container: containerElement
}) {
  return containerElement
}

/**
 *  @param {Element} containerElement
 *  @returns {Element | null}
 */
function getComponentElementFromContainerElement ({
  firstElementChild: componentElement = null
}) {
  return componentElement
}

/**
 *  @param {RenderType} render
 *  @returns {Record<PropertyKey, unknown> | null}
 */
export function toSnapshotFromRender (render) {
  return (
    toSnapshotFromComponentElement(
      getComponentElementFromRender(render)
    )
  )
}

/**
 *  @param {Element} containerElement
 *  @returns {Record<PropertyKey, unknown> | null}
 */
export function toSnapshotFromContainerElement (containerElement) {
  return (
    toSnapshotFromComponentElement(
      getComponentElementFromContainerElement(containerElement)
    )
  )
}

/**
 *  @param {Element | null} [componentElement]
 *  @returns {Record<PropertyKey, unknown> | null}
 */
export function toSnapshotFromComponentElement (componentElement) {
  if (componentElement instanceof HTMLElement) {
    const fiberNode = getFiber(componentElement)

    if (fiberNode) {
      return (
        getSnapshot(fiberNode)
      )
    }
  }

  return null
}

/**
 *  @param {Element | null} [element]
 *  @returns {Record<PropertyKey, unknown> | null}
 */
export function snapshotOf (element) {
  if (element instanceof HTMLElement) {
    const fiberNode = getFiber(element)

    if (fiberNode) {
      return (
        getSnapshot(fiberNode)
      )
    }
  }

  return null
}

export {
  toSnapshotFromRender as toSnapshot
}
