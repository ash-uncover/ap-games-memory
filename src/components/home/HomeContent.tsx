import React, { ReactNode } from 'react'

import './HomeContent.css'

interface HomeContentProperties {
  children: ReactNode
}
const HomeContent = ({
  children,
}: HomeContentProperties) => {

  // Rendering //

  return (
    <div
      className='home-content'
    >
      {children}
    </div>
  )
}

export default HomeContent