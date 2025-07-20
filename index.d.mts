import type React from 'react'

declare global {
  namespace ReactComponentSnapshotTypes {
    /**
     *  https://github.com/bendtherules/react-fiber-traverse
     */

    export type FiberNode = |
      FiberNodeForClassComponent |
      FiberNodeForFunctionComponent |
      FiberNodeForInstrinsicElement |
      FiberNodeForTextNode

    interface FiberType {
      child: FiberNode | null
      sibling: FiberNode | null

      tag: number
      return?: FiberRootNode | FiberNode
    }

    export interface FiberRootNode extends FiberType {
      child: FiberNode

      elementType: React.FunctionComponent
      type: React.FunctionComponent

      stateNode: {
        current: FiberRootNode
      }
      return?: FiberRootNode
    }

    export interface FiberNodeForFunctionComponent extends FiberType {
      elementType: React.FunctionComponent
      type: React.FunctionComponent

      stateNode: null
    }

    export interface FiberNodeForClassComponent extends FiberType {
      elementType: React.ComponentClass
      type: React.ComponentClass

      stateNode: React.Component
    }

    export interface FiberNodeForInstrinsicElement extends FiberType {
      elementType: keyof React.JSX.IntrinsicElements
      type: keyof React.JSX.IntrinsicElements

      stateNode: HTMLElement
    }

    export interface FiberNodeForTextNode extends FiberType {
      child: null

      elementType: null
      type: null

      stateNode: Text
    }
  }
}

export {}
