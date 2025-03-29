import type {
  RenderResult as RenderType
} from '@testing-library/react'

import '#react-component-snapshot/fiber'

export function getComponentElement (render: RenderType): Element | null

export function getComponentElementFromRender (render: RenderType): Element | null

export function getContainerElementFromRender (render: RenderType): Element

export function toSnapshotFromRender (render: RenderType): Record<PropertyKey, unknown> | null

export function toSnapshotFromContainerElement (containerElement: Element): Record<PropertyKey, unknown> | null

export function toSnapshotFromComponentElement (componentElement?: Element | null): Record<PropertyKey, unknown> | null

export function snapshotOf (element?: Element | null): Record<PropertyKey, unknown> | null

export {
  toSnapshotFromRender as toSnapshot
}
