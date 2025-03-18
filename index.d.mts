import type React from 'react'

declare global {
  namespace ReactComponentSnapshotTypes {
    /**
     *  https://github.com/bendtherules/react-fiber-traverse
     */

    export type FiberNode =
      | FiberNodeForClassComponent
      | FiberNodeForFunctionComponent
      | FiberNodeForInstrinsicElement
      | FiberNodeForTextNode

    export interface FiberRootNode {
      child: FiberNode
      sibling: FiberNode | null

      elementType: React.FunctionComponent
      type: React.FunctionComponent

      stateNode: {
        current: FiberRootNode
      }
      return?: FiberRootNode // | null
    }

    export interface FiberNodeForFunctionComponent {
      child: FiberNode | null
      sibling: FiberNode | null

      elementType: React.FunctionComponent
      type: React.FunctionComponent

      stateNode: null
      return?: FiberNode // | null
    }

    export interface FiberNodeForClassComponent {
      child: FiberNode | null
      sibling: FiberNode | null

      elementType: React.ComponentClass
      type: React.ComponentClass

      stateNode: React.Component
      return?: FiberNode // | null
    }

    export interface FiberNodeForInstrinsicElement {
      child: FiberNode | null
      sibling: FiberNode | null

      elementType: keyof React.JSX.IntrinsicElements
      type: keyof React.JSX.IntrinsicElements

      stateNode: HTMLElement
      return?: FiberNode
    }

    export interface FiberNodeForTextNode {
      child: null
      sibling: FiberNode | null

      elementType: null
      type: null

      stateNode: Text
      return?: FiberNode
    }
  }
}

export {}
