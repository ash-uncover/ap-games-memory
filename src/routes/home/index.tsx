import React from 'react'
import { Outlet } from 'react-router-dom'

import Home from 'components/home/Home'

const RouteHome = () => {

  // Rendering //

  return (
    <Home>
      <Outlet />
    </Home>
  )
}

export default RouteHome
