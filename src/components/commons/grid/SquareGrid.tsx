import React, { ReactNode, useEffect, useRef, useState } from 'react'

import './SquareGrid.css'

interface SquareGridProperties {
  children: ReactNode[]
}

const SquareGrid = ({
  children
}: SquareGridProperties) => {

  // Hooks //

  const container = useRef<HTMLDivElement>(null)
  const innerContainer = useRef<HTMLDivElement>(null)

  const [show, setShow] = useState(false)
  const [lines, setLines] = useState(1)
  const [lineItems, setLineItems] = useState(1)

  useEffect(() => {
    updateSize()
  }, [children])

  useEffect(() => {
    const update = updateSize.bind(this)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const updateSize = () => {
    if (container!.current!.clientWidth > container!.current!.clientHeight) {
      container!.current!.classList.add('square-grid-h')
      container!.current!.classList.remove('square-grid-v')
    } else {
      container!.current!.classList.remove('square-grid-h')
      container!.current!.classList.add('square-grid-v')
    }
    const containerRatio = innerContainer!.current!.clientWidth / innerContainer!.current!.clientHeight
    const nbItems = children.length
    let lines = 1
    let currentRatio = (nbItems / lines) / lines
    while (currentRatio > containerRatio) {
      lines += 1
      currentRatio = (nbItems / lines) / lines
    }
    setLines(lines)
    setLineItems(Math.ceil(nbItems / lines))
    setShow(true)
  }

  // Events //

  // Rendering //

  const renderBody = () => {
    const result = []
    for (let rowIndex = 0; rowIndex < lines; rowIndex++) {
      result.push(renderRow(rowIndex))
    }
    return (
      <tbody className='square-grid-table-body'>
        {result}
      </tbody>
    )
  }

  const renderRow = (rowIndex: number) => {
    const result = []
    for (let itemIndex = 0; itemIndex < lineItems && lineItems * rowIndex + itemIndex < children.length; itemIndex++) {
      result.push(renderCell(rowIndex, itemIndex, children[lineItems * rowIndex + itemIndex]))
    }
    return (
      <tr
        key={`row-${rowIndex}`}
        className='square-grid-table-row'
      >
        {result}
      </tr>
    )
  }

  const renderCell = (rowIndex: number, itemIndex: number, node: ReactNode) => {
    return (
      <td
        key={`item-${rowIndex}-${itemIndex}`}
        className='square-grid-table-cell'
      >
        {node}
      </td>
    )
  }

  return (
    <div
      ref={container}
      className='square-grid'
    >
      <div
        ref={innerContainer}
        className='square-grid-inner'
      >
        {show ?
          <table
            className='square-grid-table'
          >
            {renderBody()}
          </table>
          : null}
      </div>
    </div>
  )
}

export default SquareGrid