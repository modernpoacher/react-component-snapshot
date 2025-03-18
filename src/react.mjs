// @ts-nocheck

import debug from 'debug'

const log = debug('react-component-snapshot')

// export const REACT_LEGACY_ELEMENT_TYPE = Symbol.for('react.element')
// export const REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element')
export const REACT_PORTAL_TYPE = Symbol.for('react.portal')
export const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment')
export const REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode')
export const REACT_PROFILER_TYPE = Symbol.for('react.profiler')
// export const REACT_PROVIDER_TYPE = Symbol.for('react.provider')
export const REACT_CONSUMER_TYPE = Symbol.for('react.consumer')
export const REACT_CONTEXT_TYPE = Symbol.for('react.context')
export const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref')
export const REACT_SUSPENSE_TYPE = Symbol.for('react.suspense')
export const REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list')
export const REACT_MEMO_TYPE = Symbol.for('react.memo')
export const REACT_LAZY_TYPE = Symbol.for('react.lazy')
// Symbol.for('react.scope')
// Symbol.for('react.debug_trace_mode')
export const REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen')
// Symbol.for('react.legacy_hidden')
// Symbol.for('react.tracing_marker')
// export const REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel')
// export const MAYBE_ITERATOR_SYMBOL = Symbol.iterator
export const REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference')

export function getNameFromType (type) {
  if (type == null) return null

  if (typeof type === 'function') {
    return (
      type.$$typeof === REACT_CLIENT_REFERENCE
        ? null
        : type.displayName || type.name || null
    )
  }

  if (typeof type === 'string') return type

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment'
    case REACT_PORTAL_TYPE:
      return 'Portal'
    case REACT_PROFILER_TYPE:
      return 'Profiler'
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode'
    case REACT_SUSPENSE_TYPE:
      return 'Suspense'
    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList'
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || 'Context') + '.Provider'
      case REACT_CONSUMER_TYPE:
        return (type._context.displayName || 'Context') + '.Consumer'
      case REACT_FORWARD_REF_TYPE:
      {
        const innerType = type.render
        type = type.displayName

        if (type) return type

        type = innerType.displayName || innerType.name || ''

        return (
          type !== ''
            ? `ForwardRef(${type})`
            : 'ForwardRef'
        )
      }
      case REACT_MEMO_TYPE:
      {
        const innerType = type.displayName || null

        return (
          innerType !== null
            ? innerType
            : getNameFromType(type.type) || 'Memo'
        )
      }
      case REACT_LAZY_TYPE:
      {
        const innerType = type._payload
        type = type._init

        try {
          return getNameFromType(type(innerType))
        } catch (message) {
          log(`Lazy error. Message was "${message}"`)
        }
      }
    }
  }

  return null
}

export function getType (fiberNode) {
  const type = fiberNode.type

  switch (fiberNode.tag) {
    case 24:
      return 'Cache'
    case 9:
      return (type._context.displayName || 'Context') + '.Consumer'
    case 10:
      return (type.displayName || 'Context') + '.Provider'
    case 18:
      return 'DehydratedFragment'
    case 11:
    {
      return (
        (fiberNode = type.render),
        (fiberNode = fiberNode.displayName || fiberNode.name || ''),
        type.displayName ||
            (fiberNode !== '' ? `ForwardRef(${fiberNode})` : 'ForwardRef')
      )
    }
    case 7:
      return 'Fragment'
    case 26:
    case 27:
    case 5:
      return type
    case 4:
      return 'Portal'
    case 3:
      return 'Root'
    case 6:
      return 'Text'
    case 16:
      return getNameFromType(type)
    case 8:
      return (
        type === REACT_STRICT_MODE_TYPE
          ? 'StrictMode'
          : 'Mode'
      )
    case 22:
      return 'Offscreen'
    case 12:
      return 'Profiler'
    case 21:
      return 'Scope'
    case 13:
      return 'Suspense'
    case 19:
      return 'SuspenseList'
    case 25:
      return 'TracingMarker'
    case 1:
    case 0:
    case 14:
    case 15:
      if (typeof type === 'function') return type.displayName || type.name || null
      if (typeof type === 'string') return type
      break
    case 29:
    {
      const type = fiberNode._debugInfo || null

      if (type != null) {
        let i = type.length - 1

        for (i; i >= 0; i--) {
          const t = type[i]
          const n = t.name

          if (typeof n === 'string') return n
        }
      }

      if (fiberNode.return !== null) return getType(fiberNode.return)
    }
  }
  return null
}
