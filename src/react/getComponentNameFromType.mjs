/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  REACT_CONTEXT_TYPE,
  REACT_CONSUMER_TYPE,
  REACT_FORWARD_REF_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_PORTAL_TYPE,
  REACT_MEMO_TYPE,
  REACT_PROFILER_TYPE,
  REACT_PROVIDER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
  REACT_SUSPENSE_LIST_TYPE,
  REACT_LAZY_TYPE,
  REACT_TRACING_MARKER_TYPE,
  REACT_VIEW_TRANSITION_TYPE,
  REACT_ACTIVITY_TYPE
} from './ReactSymbols.mjs'

/**
 * @param {{displayName?: string | null}} outerType
 * @param {{displayName?: string | null, name?: string | null}} innerType
 * @param {string} wrapperName
 * @returns
 */
function getWrappedName (
  outerType,
  innerType,
  wrapperName
) {
  const outerDisplayName = outerType.displayName

  if (outerDisplayName) {
    return outerDisplayName
  }

  const innerDisplayName = innerType.displayName || innerType.name || null

  if (innerDisplayName) {
    return `${wrapperName}(${innerDisplayName})`
  }

  return wrapperName
}

/**
 * @param {{displayName?: string | null}} type
 * @returns {string}
 */
function getContextName (type) {
  return type.displayName || 'Context'
}

const REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference')

/**
 * @param {unknown} type
 * @returns {string | null}
 */
export default function getComponentNameFromType (type) {
  if (type == null) return null

  if (typeof type === 'function') { // @ts-expect-error
    if (type.$$typeof === REACT_CLIENT_REFERENCE) return null
    return ( // @ts-expect-error
      type.displayName || type.name || null
    )
  }

  if (typeof type === 'string') return type

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment'
    case REACT_PROFILER_TYPE:
      return 'Profiler'
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode'
    case REACT_SUSPENSE_TYPE:
      return 'Suspense'
    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList'
    case REACT_ACTIVITY_TYPE:
      return 'Activity'
    case REACT_VIEW_TRANSITION_TYPE:
      return 'ViewTransition'
    case REACT_TRACING_MARKER_TYPE:
      return 'TracingMarker'
  }

  if (typeof type === 'object') { // @ts-expect-error
    switch (type.$$typeof) {
      case REACT_PORTAL_TYPE:
        return 'Portal'

      case REACT_PROVIDER_TYPE: // @ts-expect-error
        return getContextName(type._context) + '.Provider'

      case REACT_CONTEXT_TYPE:
        return getContextName(type) + '.Context'

      case REACT_CONSUMER_TYPE: // @ts-expect-error
        return getContextName(type._context) + '.Consumer'

      case REACT_FORWARD_REF_TYPE: // @ts-expect-error
        return getWrappedName(type, type.render, 'ForwardRef')

      case REACT_MEMO_TYPE:
      {
        // @ts-expect-error
        const outerName = type.displayName || null

        if (outerName !== null) {
          return outerName
        }

        // @ts-expect-error
        return getComponentNameFromType(type.type) || 'Memo'
      }

      case REACT_LAZY_TYPE:
      {
        // @ts-expect-error
        const payload = type._payload

        // @ts-expect-error
        const init = type._init

        try {
          return getComponentNameFromType(init(payload))
        } catch {
          return null
        }
      }
    }
  }

  return null
}
