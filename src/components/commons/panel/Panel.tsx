import React, { ReactNode } from 'react'

import './Panel.css'

interface PanelProperties {
  children: ReactNode
  top?: string
  left?: string
  bottom?: string
  right?: string
  width?: string
  height?: string
}

const Panel = ({
  children,
  top,
  left,
  bottom,
  right,
  width,
  height,
}: PanelProperties) => {

  // Rendering //

  return (
    <div
      className='panel'
      style={{
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        width,
        height,
      }}
    >
      {children}
    </div>
  )
}

export default Panel