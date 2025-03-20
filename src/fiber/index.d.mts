import type React from 'react'

type FiberNode = ReactComponentSnapshotTypes.FiberNode
type StateNodeType = Element | Text | React.Component<any, any>

export function getStateNodeFiber (stateNode: StateNodeType) : Record<PropertyKey, unknown> | null

export function getStateNodeProps (stateNode: StateNodeType): Record<PropertyKey, unknown> | null

export function getFiber (element: Element): FiberNode | null

export default function getSnapshot (fiberNode: FiberNode): Record<PropertyKey, unknown>
