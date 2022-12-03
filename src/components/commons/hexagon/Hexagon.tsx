import React, { ReactNode } from 'react'

import './Hexagon.css'

interface HexagonProperties {
  children: ReactNode
}

const Hexagon = ({
  children
}: HexagonProperties) => {

  // Rendering //

  const borderColor = 'red'
  const borderWidth = '2px'

  return (
    <div
      className='hexagon'
    >
      <div
        className='layer layer-border'
        style={{
          backgroundColor: borderColor
        }}
      >
        <div
          className='layer layer-content'
          style={{
            top: borderWidth,
            bottom: borderWidth,
            right: borderWidth,
            left: borderWidth,
          }}
        >
          <div
            className='layer layer-background '
            style={{
              top: `-${borderWidth}`,
              bottom: `-${borderWidth}`,
              right: `-${borderWidth}`,
              left: `-${borderWidth}`,
            }}
          >
            <img
              className='image'
              draggable='false'
            />
          </div>
          <div
            className='layer layer-elements'
            style={{
              top: `-${borderWidth}`,
              bottom: `-${borderWidth}`,
              right: `-${borderWidth}`,
              left: `-${borderWidth}`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hexagon